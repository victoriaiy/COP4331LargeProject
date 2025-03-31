require('dotenv').config();

const md5 = require('./md5');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// Connect to MongDB
const uri = "mongodb+srv://COP4331:NfRRUet8PomqvOtH@poosd-large-project.ujyws.mongodb.net/?retryWrites=true&w=majority&appName=POOSD-Large-Project";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect()
  .then(() => {
    console.log("MongoDB Works :)");
  })
  .catch(err => {
    console.error("MongoDB No Works :(", err);
  });

// API endpoints

// signup
app.post('/api/signup', async (req, res) => {
  const { username, password, email } = req.body;

  const newUserId = await getUniqueUserId()
  const verificationToken = Math.random().toString(36).substr(2, 15);

  const newUser = {
    UserId: newUserId,
    UserName: username,
    Password: md5(password),
    Email: email,

    Verified: false,   
    VerificationToken: verificationToken,
    VocabLists: [],
    ProgressLevel: 1,
    LoginStreak: 1,
    Friends: [],
    LearnedWords: [],
    Badges: [],
  };

  try {
    // access database
    const db = client.db("POOSD"); // Database name
    await db.collection("Users").insertOne(newUser); // Collections name

    sendVerificationEmail(email, username, verificationToken);

    res.status(200).json({ error: "" });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// login
app.post('/api/login', async (req, res) => {
  console.log("THIS IS WORKING")
  const { username, password } = req.body;

  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ UserName: username, Password: md5(password) });

    if (user) {
      res.status(200).json({
        id: user.UserId,
        email: user.Email,
        error: ""
      });
    } else {
      res.status(401).json({
        id: -1,
        email: "",
        error: "Invalid user name/password"
      });
    }
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

//function finds unique user id. probably not most efficient but works
async function getUniqueUserId() {
  let counter = 1;
  const db = client.db("POOSD");
  let userId;
  let userExists = true;
  while (userExists) {
    userId = "user" + counter;
    userExists = await db.collection("Users").findOne({ UserId: userId });
    if (userExists) {
      counter++;
    }
  }
  console.log("Unique UserId found:", userId);
  return userId;
}



const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);



// Function to send the verification email
async function sendVerificationEmail(email, username, verificationToken) {
  const verificationLink = `http://habla-plus.xyz:5001/verify?token=${verificationToken}`;
  
  try {
    await resend.emails.send({
      from: 'Habla+ <onboarding@resend.dev>',  // You can change after domain verify
      to: email,
      subject: 'Email Verification',
      text: `Hello ${username}, click here to verify: ${verificationLink}`,
    });
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
}

app.get('/verify', async (req, res) => {
  const token = req.query.token;
  if (!token) return res.status(400).send('Token missing');

  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ VerificationToken: token });
    if (!user) return res.status(404).send('Invalid token');

    await db.collection("Users").updateOne(
      { VerificationToken: token },
      { $set: { Verified: true }, $unset: { VerificationToken: "" } }
    );
    res.send('Email verified!');
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).send('Internal error');
  }
});


//change password

// send password reset email
app.post('/api/resetpasswordemail', async (req, res) => {
  const { email } = req.body;
  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ Email: email });
    if (!user) {
      return res.status(404).json({ error: "No account with that email found" });
    }

    const passwordResetToken = Math.random().toString(36).substr(2, 15);
    const passwordResetExpires = new Date();
    passwordResetExpires.setHours(passwordResetExpires.getHours() + 1);

    await db.collection("Users").updateOne(
      { Email: email },
      {
        $set: {
          PasswordResetToken: passwordResetToken,
          PasswordResetExpires: passwordResetExpires
        }
      }
    );

    await sendPasswordResetEmail(email, user.Username, passwordResetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// first send email prompt to change
async function sendPasswordResetEmail(email, username, passwordResetToken) {
  const resetLink = `http://habla-plus.xyz:5001/resetpassword?token=${passwordResetToken}`;
  try {
    await resend.emails.send({
      from: 'Habla+ <onboarding@resend.dev>',
      to: email,
      subject: 'Reset Password',
      text: `Hello ${username}, click here to reset your password: ${resetLink}`
    });
    console.log('Password reset email sent');
  } catch (error) {
    console.error('Error sending password reset email:', error);
  }
}



// Second check if expired otherwise change


app.post('/api/resetpassword', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ PasswordResetToken: token });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    // Check if expired
    if (user.PasswordResetExpires < new Date()) {
      return res.status(400).json({ error: "Token expired" });
    }

    // Change password and remove token and its expiration
    await db.collection("Users").updateOne(
      { PasswordResetToken: token },
      { $set: { Password: md5(newPassword) }, $unset: { PasswordResetToken: "", PasswordResetExpires: "" } }
    );

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// delete user
app.delete('/api/delete', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Need user ID" });
  }

  try {
    const db = client.db("POOSD");
    const result = await db.collection("Users").deleteOne({ UserId: userId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// get level
app.post('/api/getlevel', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "Need UserID" });
  }

  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ UserId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ level: user.ProgressLevel });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// add level
app.post('/api/addlevel', async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || typeof amount !== 'number') {
    return res.status(400).json({ error: "userId and amount of levels needed" });
  }

  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ UserId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await db.collection("Users").findOneAndUpdate(
      { UserId: userId },
      { $inc: { ProgressLevel: amount } }
    );

    res.status(200).json({ message: `Level increased by ${amount}` });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});


//profile picture
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer storage config for profile_pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile_pictures/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${req.body.userId}_${Date.now()}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Make profile_pictures publicly accessible
app.use('/profile_pictures', express.static(path.join(__dirname, 'profile_pictures')));

// Upload profile picture API
app.post('/api/profilepicture', upload.single('profilePicture'), async (req, res) => {
  const { userId } = req.body;

  if (!userId || !req.file) {
    return res.status(400).json({ error: "No id or file" });
  }

  try {
    const db = client.db("POOSD");
    const user = await db.collection("Users").findOne({ UserId: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const imagePath = `/profile_pictures/${req.file.filename}`;

    await db.collection("Users").updateOne(
      { UserId: userId },
      { $set: { ProfilePicture: imagePath } }
    );

    res.status(200).json({ message: "Profile picture uploaded", imageUrl: imagePath });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});



app.listen(5001, () => {
  console.log("Server started on port 5001");
});


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from './SignInComponents/CreateAccount';
import Signin from './Singin'
import Home from './Home'
import "./App.css"
import SignInForm from './SignInComponents/SignInForm';
import Profile from './Profile';
import VocabChallengeComponent from './Challenges/VocabChallengeComponent';
import SettingsPage from './Setting';
import LearnWordPage from "./LearnWordPage";
import AddVocabListPage from "./LearnComponents/AddVocabListPage";
import ForgotPasswordForm from "./SignInComponents/ForgotPassword";




const App = () =>{


  return(
    <Router>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path='SignIn' element={<SignInForm/>}/>
        <Route path="Home" element={<Home/>}/>
        <Route path="Profile" element={<Profile/>}/>
        <Route path="Setting" element={<SettingsPage/>}/>
        <Route path="/learn/:category" element={<LearnWordPage/>}></Route>
        <Route path="add-vocab" element={<AddVocabListPage/>}/>
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />


        {/*Routes for challenges*/}
        <Route path="Vocab" element={<VocabChallengeComponent/>}/>
      </Routes>
  </Router>
  )
}
export default App;

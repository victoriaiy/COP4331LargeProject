import { useRef } from "react";
import { useNavigate } from "react-router-dom";



const ProfilePicture = ({ src, username, size = 64, onUploadSuccess }) => {
  const navigate = useNavigate();

  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId)
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("profilePicture", file);

    try {
      const res = await fetch("https://backup-backend-j6zv.onrender.com/api/profilepicture", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (res.ok) {
        alert("Profile picture updated!");
        // Optionally reload the page or update state
        if(onUploadSuccess) onUploadSuccess();
      } else {
        console.error("Upload failed:", data.error);
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload error");
    }
  };

  const firstLetter = username?.charAt(0)?.toUpperCase() || "?";

  return (
    <>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      <div onClick={handleImageClick} className="cursor-pointer group relative">
        {src ? (
          <img
            src={`https://backup-backend-j6zv.onrender.com${src.startsWith('/') ? '' : '/'}${src}`}
            alt="Profile"
            className="rounded-full object-cover transition hover:brightness-90"
            style={{ width: size, height: size }}
          />
        ) : (
          <div
            className="rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold hover:brightness-90"
            style={{ width: size, height: size }}
          >
            {firstLetter}
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-10 rounded-full p-2 group-hover:flex items-center justify-center hidden">
          <span className="text-xs text-white">Click to update</span>
        </div>
      </div>
    </>
  );
};

export default ProfilePicture 
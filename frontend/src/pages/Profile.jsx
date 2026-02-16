import { useEffect, useState } from "react";
import API from "../api/axios";
import handleDownload from "../utils/Download";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [err, setErr] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/user/profile");
      setProfile(data.user);
      setUsername(data.user.username);
      setEmail(data.user.email);
    } catch (error) {
      console.error("fetch profile error", error);
      setErr(error.response?.data?.message || "error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.put("/user/profile", {
        username,
        email,
        currentPassword,
        newPassword,
      });

      setProfile(data.user);
      setMessage("Profile updated successfully!");
      setIsEditing(false);

      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setMessage(error.response?.data?.message || "failed to update profile");
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete the account? This cannot be undone."
      )
    ) {
      try {
        await API.delete("/user/profile");
        localStorage.removeItem("token");
        window.location.href = "/register";
      } catch (error) {
        setMessage(error.response?.data?.message || "failed to delete account");
      }
    }
  };

  if (loading) return <p className="text-center mt-6">Loading profile...</p>;
  if (err) return <p className="text-red-500 text-center mt-6">{err}</p>;

return (
  <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
    <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg relative">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-2xl"
      >
        ←
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>

      {!isEditing ? (
        <>
          <div className="mb-4">
            <p>
              <strong>Username:</strong> {profile.username}
            </p>
            <p>
              <strong>Email:</strong> {profile.email}
            </p>
            <p>
              <strong>Role:</strong> {profile.role}
            </p>
            <p>
              <strong>Email verified:</strong>{" "}
              {profile.isEmailVerified ? "Yes" : "No"}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {new Date(profile.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete Account
            </button>
            <hr className="my-4" />
            <button
              onClick={() => handleDownload("expense")}
              className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Download Expenses CSV
            </button>
            <button
              onClick={() => handleDownload("income")}
              className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Download Income CSV
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {message && (
        <p className="mt-4 text-green-600 font-medium text-center">{message}</p>
      )}
    </div>
  </div>
);

}

export default Profile;

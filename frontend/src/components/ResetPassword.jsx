
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../api/axios.js';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [msg, setMsg] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    if (!email || !token) {
      setMsg("Missing token or email in the URL. Use the link from your email");
    }
  }, [token, email]);

  const handleRequest = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      setMsg("Password length must be at least 6 characters");
      alert("Password length must be at least 6 characters");
      return;
    }
    if (newPassword !== confirm) {
      setMsg("New Password and Confirm Password must be the same");
      alert("New Password and Confirm Password must be the same");
      return;
    }

    try {
      const { data } = await API.post("/auth/reset-password", {
        email,
        token,
        newPassword,
      });

      setMsg(data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMsg(error.response?.data?.message || "Error in resetting password");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        background: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reset Password</h2>
      <form onSubmit={handleRequest} style={{ display: "grid", gap: "12px" }}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Reset Password
        </button>
      </form>
      {msg && (
        <p style={{ marginTop: "12px", color: "green", textAlign: "center" }}>{msg}</p>
      )}
    </div>
  );
}

export default ResetPassword;

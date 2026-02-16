
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios.js';

function RequestReset() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/request-password-reset", { email });
      setMsg(data.message);
    } catch (error) {
      setMsg(error.response?.data?.message || "Error requesting reset password");
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Request Password Change</h2>
      <form onSubmit={handleRequest} style={{ display: "grid", gap: "12px" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Send Reset Email
        </button>
      </form>
      {msg && (
        <p style={{ marginTop: "12px", textAlign: "center", color: "green" }}>{msg}</p>
      )}
      <p style={{ textAlign: "center", marginTop: "15px" }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: "8px 14px",
            background: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to login
        </button>
      </p>
    </div>
  );
}

export default RequestReset;

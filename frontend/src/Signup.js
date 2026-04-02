import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/signup", {
        email,
        password,
      });

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert("User already exists");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Signup</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSignup}>
          Signup
        </button>

        <p style={styles.text}>
          Already have an account?{" "}
          <span style={styles.link} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #000428, #004e92)",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "35px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },

  title: {
    color: "white",
    marginBottom: "20px",
    fontSize: "22px",
  },

  input: {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    height: "42px",
    background: "#ff4b2b",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "5px",
  },

  text: {
    marginTop: "15px",
    color: "#ccc",
    fontSize: "13px",
  },

  link: {
    color: "#00c6ff",
    cursor: "pointer",
  },
};

export default Signup;
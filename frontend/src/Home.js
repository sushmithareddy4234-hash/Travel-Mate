import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Travel Mate</h1>
        <p style={styles.subtitle}>Plan your trips smartly ✈️</p>

        <div style={styles.buttonContainer}>
          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            style={styles.signupBtn}
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </div>
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
    background: "linear-gradient(to right, #141e30, #243b55)",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "40px",
    borderRadius: "12px",
    width: "320px",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
  },

  title: {
    color: "white",
    marginBottom: "10px",
    fontSize: "28px",
  },

  subtitle: {
    color: "#ccc",
    marginBottom: "25px",
    fontSize: "14px",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  loginBtn: {
    padding: "10px",
    background: "#00c6ff",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  signupBtn: {
    padding: "10px",
    background: "#ff4b2b",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Home;
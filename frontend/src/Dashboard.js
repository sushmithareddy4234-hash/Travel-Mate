import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const [place, setPlace] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");   // ✅ NEW
  const [trips, setTrips] = useState([]);
  const [plan, setPlan] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const addTrip = async () => {
    await axios.post("http://localhost:5000/add-trip", {
      email: user,
      place,
      budget,
    });

    setPlace("");
    setBudget("");
    fetchTrips();
  };

  const fetchTrips = async () => {
    const res = await axios.get(
      `http://localhost:5000/my-trips/${user}`
    );
    setTrips(res.data);
  };

  const generatePlan = async () => {
    const res = await axios.post("http://localhost:5000/generate-plan", {
      place,
      budget,
      days,   // ✅ SEND DAYS
    });

    const cleanText = res.data.plan.replace(/\*\*/g, "");
    setPlan(cleanText);
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>Travel Mate</h2>
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div style={styles.tripBar}>
        <h3>Add Trip</h3>

        <input
          style={styles.input}
          placeholder="Enter place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Enter budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Number of days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <button style={styles.addBtn} onClick={addTrip}>
          Add Trip
        </button>

        <button style={styles.planBtn} onClick={generatePlan}>
          Generate Plan
        </button>
      </div>

      {plan && (
        <div style={styles.planBox}>
          <h3>Your Travel Plan</h3>
          <pre style={styles.planText}>{plan}</pre>
        </div>
      )}

      <div style={styles.tripsSection}>
        {trips.map((trip, index) => (
          <div key={index} style={styles.card}>
            <h3>{trip.place}</h3>
            <p>Budget: ₹{trip.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #141e30, #243b55)",
    color: "white",
    padding: "20px",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  logout: {
    background: "#ff4b2b",
    border: "none",
    padding: "10px",
    color: "white",
    borderRadius: "5px",
  },

  tripBar: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    height: "40px",
    marginBottom: "10px",
    padding: "0 10px",
    borderRadius: "5px",
    border: "none",
  },

  addBtn: {
    marginRight: "10px",
    padding: "10px 15px",
    background: "#00c6ff",
    border: "none",
    color: "white",
    borderRadius: "5px",
  },

  planBtn: {
    padding: "10px 15px",
    background: "#28a745",
    border: "none",
    color: "white",
    borderRadius: "5px",
  },

  planBox: {
    background: "rgba(255,255,255,0.1)",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  planText: {
    whiteSpace: "pre-wrap",
    lineHeight: "1.6",
  },

  tripsSection: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "15px",
    borderRadius: "10px",
    width: "200px",
  },
};

export default Dashboard;
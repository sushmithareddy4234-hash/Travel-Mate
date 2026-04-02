# Travel Mate

Travel Mate is an AI-powered travel planning web application that helps users plan trips based on destination, budget, and number of days. It generates smart itineraries with detailed daily plans, budget breakdowns, and travel tips.

---

## Features

- User Authentication (Login/Register)
- Add Trips with Place, Budget, and Days
- AI-based Travel Plan Generator (using Groq API)
- Day-wise Itinerary Planning
- Budget Breakdown
- Travel Tips & Recommendations
- View Saved Trips

---

## Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Groq API (LLM)

---

## Project Structure

```
Travel-Mate
│
├── Backend
│   ├── models
│   ├── routes
│   ├── controllers
│   └── server.js
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── .gitignore
```

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Travel-Mate.git
cd Travel-Mate
```

---

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside **Backend**:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Run backend:

```bash
node server.js
```

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

---

## How It Works

- User enters **Place + Budget + Days**
- Backend sends request to **Groq API**
- AI generates:
  - Day-wise itinerary
  - Budget breakdown
  - Travel tips
- Plan is displayed on dashboard

---

## Future Improvements

- Auto-suggestions for places
- Google Maps integration
- Hotel & transport recommendations
- Mobile responsive UI

const express = require("express");
const router = express.Router();

// Dummy travel data
const destinations = [
    { name: "Goa", budget: 10000 },
    { name: "Manali", budget: 15000 },
    { name: "Hyderabad", budget: 5000 }
];

// Get destinations
router.get("/destinations", (req, res) => {
    res.json(destinations);
});

module.exports = router;
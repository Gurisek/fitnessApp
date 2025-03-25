const express = require("express");
const app = express();
const connectDB = require('./config/db');

// napojeni na MongoDB
connectDB();

// vytvorime jednoduchy endpoint, ktery bude vracet JSON s treninkovymi daty
app.get("/api", (req, res) => {
  res.json({ training: ["trainingOne", "trainingTwo", "trainingThree"] });
});

// pozor port 5000 je default, ale musel jsem zmenit na 5001, protoze 5000 uz byl pouzity
app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

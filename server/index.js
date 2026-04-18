const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectdb = require("./config/mongodb");
const setupRoutes = require("./routes/routes");
const errorHandler = require("./middleware/errorHandler");
const cleanupGuestBugs = require("./utils/cleanupGuestBugs");

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://bug-trace-beta.vercel.app/"
}));
app.use(express.json());
app.use(errorHandler);

setInterval(() => {
  cleanupGuestBugs();
}, 60 * 60 * 1000);

setupRoutes(app);

app.get("/", (req, res) => {
  res.send("Welcome to the Bug Tracker API!");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  connectdb();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
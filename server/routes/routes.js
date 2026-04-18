const bugRoutes = require("./bugRoute");
const authRoutes = require("./authRoute");
const contactRoutes = require("./contactRoute");

const setupRoutes = (app) => {
  app.use("/bugs", bugRoutes);
  app.use("/auth", authRoutes);
  app.use("/contact", contactRoutes);
};

module.exports = setupRoutes;
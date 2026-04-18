const Bug = require("../models/bugModel");

const cleanupGuestBugs = async () => {
  try {
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - ONE_DAY);

    const result = await Bug.deleteMany({
      guestId: { $ne: null },
      createdAt: { $lt: cutoff }
    });

    console.log(`🧹 Deleted ${result.deletedCount} old guest bugs`);
  } catch (err) {
    console.error("Cleanup error:", err.message);
  }
};

module.exports = cleanupGuestBugs;
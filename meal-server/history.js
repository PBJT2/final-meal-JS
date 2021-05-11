require("dotenv").config();
const router = require("express").Router();

// GET /history/search
// Return all search history
router.get("/search", async (req, res) => {
  const db = req.app.locals.db;
  const collection = db.collection("Meals");
  const query = {};
  const all = await collection.find(query).toArray();
  res.json(all);
});

module.exports = router;

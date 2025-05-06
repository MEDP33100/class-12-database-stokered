const express = require("express");
const router = express.Router();
const database = require("../config/db");

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const db = database.client.db("moths"); // database name
    const mothsCollection = db.collection("moths"); // collection name

    const allMoths = await mothsCollection.find().toArray();

    console.log("Rendering moths:", allMoths);

    res.render("index", {
      title: "Moth Museum",
      moths: allMoths,
    });
  } catch (e) {
    console.error("Error loading moths:", e);
    res.status(500).render("error", {
      message: "Failed to load moths",
    });
  }
});

module.exports = router;

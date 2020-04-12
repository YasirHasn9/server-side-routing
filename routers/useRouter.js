const express = require("express");
const db = require("../data/db");
const route = express.Router();

route.get("/", async (req, res) => {
  const posts = await db.find();
  res.status(200).json(posts);
});


module.exports = route;

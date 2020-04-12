const express = require("express");
const db = require("../data/db");
const route = express.Router();

route.get("/", async (req, res) => {
  const posts = await db.find();
  res.status(200).json(posts);
});

route.get("/:id", async (req, res) => {
  const {id} = req.params;
  if (!id) {
    return res.status(404).send({
      message: "Post Not Found"
    });
  }
  const post = await db.findById(id);
  res.status(200).json(post);
});


module.exports = route;

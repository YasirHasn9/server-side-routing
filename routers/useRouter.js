const express = require("express");
const db = require("../data/db");
const route = express.Router();

route.get("/", async (req, res) => {
  const posts = await db.find();
  res.status(200).json(posts);
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send({
      message: "Post Not Found"
    });
  }
  const post = await db.findById(id);
  res.status(200).json(post);
});

route.post("/", async (req, res) => {
  let userInputs = req.body;
  if (!userInputs) {
    return res.status(500).send("There is something wrong");
  }
  let newPost = await db.insert(userInputs);
  return res.status(201).json(newPost);
});

module.exports = route;

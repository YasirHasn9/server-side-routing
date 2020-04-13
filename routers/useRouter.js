const express = require("express");
const db = require("../data/db");
const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await db.find();
  res.status(200).json(posts);
});

router.get("/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(404).json({
      messages: "Can't be found"
    });
  } else {
    post = db
      .findById(req.params.id)
      .then(post => res.status(200).json(post))
      .catch(err => res.status(401).json({ messages: err }));
  }
});

router.post("/", async (req, res) => {
  let userInputs = req.body;
  if (!userInputs) {
    return res.status(500).send("There is something wrong");
  }
  //   check if the post is existed in the array
  let posts = await db.find();
  for (let i = 0; i < posts.length; i++) {
    if (
      posts[i]["title"] === req.body.title &&
      posts[i]["contents"] === req.body.contents
    ) {
      return res.status(400).send("this post is there");
    }
  }

  let newPost = await db.insert(userInputs);
  return res.status(201).json(newPost);
});

router.put("/:id", async (req, res) => {
  // get the updated if
  let { title, contents } = req.body;
  try {
    // get the id
    if (req.params.id) {
      if (!title || !contents) {
        return res
          .status(400)
          .json({ message: "Please provide title and contents for the post." });
      }
    } else {
      return res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    let updatedPost = await db.update(req.params.id, req.body);
    return res.status(201).json(updatedPost);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something wrong");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let post = await db.remove(req.params.id);
    res.status(401).json(post);
  } catch (err) {
    if (!req.params.id) {
      console.log(err);
      return res.status(500).send("Something went wrong");
    }
  }
});
module.exports = router;

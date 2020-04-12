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
  //   check if the post is exists in the array
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

router.put("/:id", (req, res) => {
  // get the updated if
  let { title, contents } = req.body;
  // get the id
  if (req.params.id) {
    if (!title || !contents) {
      return res
        .status(400)
        .json({ message: "Please provide title and contents for the post." });
    } else {
      return db
        .update(req.params.id, req.body)
        .then(post => res.status(201).json(post))
        .catch(() => {
          res.status(500).json({
            errorMessage: "The post information could not be modified."
          });
        });
    }
  } else {
    return res
      .status(404)
      .json({ message: "The post with the specified ID does not exist." });
  }

  // get the info title and contents and the id
  // check if there an id
  // we got the id then check if the title and contents been filled
  // filled send it to to the db , NOT send an error message

  // there is no id then send an Error massage
});

module.exports = router;

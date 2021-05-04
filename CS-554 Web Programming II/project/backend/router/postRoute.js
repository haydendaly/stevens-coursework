const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const data = require("../data");
const postDataObj = data.post;
const likeDataObj = data.likes;
const commentDataObj = data.comment;

router.get("/", async (req, res) => {
  try {
    let allPost = await postDataObj.getAllPost();
    res.json(allPost);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.get("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(404).json({ error: "Post Id missing" });
    return;
  }

  try {
    let post = await postDataObj.getPostById(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/", async (req, res) => {
  if (
    !req.body ||
    !req.body.userId ||
    !req.body.text ||
    !req.body.commentsArray ||
    !req.body.likesArray
  ) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  let postParamBody = req.body;
  try {
    let newPost = await postDataObj.createPost(
      postParamBody
    );
    res.json(newPost);
  } catch (error) {
    res.status(404).json({ error: "Cannot add new Post" });
  }
});

router.delete("/:id" , async(req, res) => {
   if(!req.params.id){
    res.status(404).json({ error: "Must supply post Id." });
    return;
   }

   try {
     let deleted = await postDataObj.deletePost(req.params.id);
     if(deleted){
       res.json({deleted : "true"})
     }    
   } catch (error) {
    res.status(404).json({ error:  `Cannot delete post : ${error}` });
   }

})

router.post("/:postId/likes", async (req, res) => {
  if (!req.body || !req.body.userId || !req.params.postId) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  let paramBody = req.body;
  try {
    let newData = await likeDataObj.addLike(req.params.postId, paramBody.userId);

    let post = await postDataObj.getPostById(req.params.postId);

    let likeArray = post["likesArray"];
    likeArray.push(newData);
  
    let updateData = await postDataObj.updatePost(
      req.params.postId,
      post["userId"],
      post["text"],
      post["commentsArray"],
      likeArray,
      post["songData"],
    );

    res.json(updateData);
  } catch (error) {
    res.status(404).json({ error: "Cannot add like for given post" });
  }
});

router.delete("/:postId/likes/:likeId", async (req, res) => {
  if (!req.params.postId || !req.params.likeId) {
    res.status(404).json({ error: "Must supply movie Id and comment Id" });
    return;
  }

  try {
    let post = await postDataObj.getPostById(req.params.postId);
    let likesArray = post["likesArray"];

    if (
      !likesArray ||
      !Array.isArray(likesArray) ||
      likesArray.length === 0
    ) {
      throw "Empty likes array";
    }

    let updatedLikeArray = await likeDataObj.deleteLike(req.params.likeId, likesArray);

    let updateData = await postDataObj.updatePost(
          req.params.postId,
          post["userId"],
          post["text"],
          post["commentsArray"],
          updatedLikeArray,
          post["songData"]
    );
    res.json(updateData);
    }catch (error) {
    res.status(404).json({ error: "Cannot delete like." });
    return;
  }
});


router.post("/:postId/comment", async (req, res) => {
  if (!req.body || !req.body.userId || !req.params.postId || !req.body.commentText) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  let paramBody = req.body;
  try {
    let newData = await commentDataObj.addComment(paramBody.userId, paramBody.commentText);

    let post = await postDataObj.getPostById(req.params.postId);

    let commentArray = post["commentsArray"];
    commentArray.push(newData);

    let updateData = await postDataObj.updatePost(
      req.params.postId,
      post["userId"],
      post["text"],
      commentArray,
      post["likesArray"],
      post["songData"]
    );

    res.json(updateData);
  } catch (error) {
    res.status(404).json({ error: `Cannot add comment for given post : ${error}` });
  }
});

router.delete("/:postId/comment/:commentId", async (req, res) => {
  if (!req.params.postId || !req.params.commentId) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  let paramBody = req.body;
  try {
    let post = await postDataObj.getPostById(req.params.postId);

    let commentArray = post["commentsArray"];
  
    if (
      !commentArray ||
      !Array.isArray(commentArray) ||
      commentArray.length === 0
    ) {
      throw "Empty comment array";
    }

    let newData = await commentDataObj.deleteComment(req.params.commentId, commentArray);

    let updateData = await postDataObj.updatePost(
      req.params.postId,
      post["userId"],
      post["text"],
      newData,
      post["likesArray"],
      post["songData"]
    );

    res.json(updateData);
  } catch (error) {
    res.status(404).json({ error: `Cannot delete comment for given post ${error}` });
  }
});


router.put("/:id", async (req, res) => {
  if (
    !req.params.id ||
    !req.body ||
    !req.body.userId ||
    !req.body.text ||
    !req.body.commentArray ||
    !req.body.likeArray ||
    !req.body.songData
  ) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  let postBody = req.body;

  try {
    let post = await postDataObj.getPostById(req.params.id);
    if(!post){
      throw `Error : Cannot find post of id : ${req.params.id}`
    }

    let updatePost = await postDataObj.updatePost(
      req.params.id,
      postBody["userId"],
      postBody["text"],
      postBody["commentsArray"],
      postBody["likesArray"],
      postBody["songData"]
    );
    res.json(updatePost);
  } catch (error) {
    res.status(404).json({ error: "Cannot update Post." });
  }
});

router.patch("/:id", async (req, res) => {
  if (!req.params.id || !req.body || Object.keys(req.body).length === 0) {
    res.status(404).json({
      error: "Must provide atleast one field in request body.",
    });
    return;
  }

  let postBody = req.body;
  let oldPost = {};

  try {
    oldPost = await postDataObj.getPostById(req.params.id);
    
    if(postBody && postBody.text != oldPost.text){
      oldPost.text = postBody.text
    }

    let updatePost = await postDataObj.updatePost(
      req.params.id,
      oldPost["userId"],
      oldPost["text"],
      oldPost["commentsArray"],
      oldPost["likesArray"],
      oldPost["songData"]
    );
    res.json(updatePost);
  } catch (error) {
    res.status(404).json({ error: "Cannot update Post." });
  }
});


module.exports = router;

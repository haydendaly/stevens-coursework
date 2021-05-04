const dbCollections = require("../config/collection");
const postCollectionObj = dbCollections.post;
const { v1: uuidv4 } = require("uuid");
const userData = require("./userData");

function getValidId(id) {
  if (!id) {
    throw "Given post id is invalid";
  }

  if (typeof id != "object" && typeof id != "string") {
    throw "Provide  post id of type object or string ";
  }

  return id;
}

async function getAllPost(){
    const postObj = await postCollectionObj();
    const allPostData = await postObj
      .find({})
      .toArray();
  
    if (allPostData === null) {
      throw `No movie found in database`;
    }
    return allPostData;
}

async function getPostById(id) {
    id = getValidId(id);
    let postObj = await postCollectionObj();
  
    let postData = await postObj.findOne({ _id: id });
  
    if (postData === null) {
      throw `Error :Cannot find post with given id : ${id} into database`;
    }
  
    return postData;
}

async function createPost(postParam) {
  userId = getValidId(postParam["userId"], "User Id");
  commentIdArray = postParam["commentsArray"];
  likesIdArray = postParam["likesArray"];
  postText = postParam["text"];
  songData = postParam["songData"];

  const user = await userData.getUserById(userId);
  
  let postSchema = {
    _id: uuidv4(),
    commentsArray : commentIdArray,
    likesArray : likesIdArray,
    text: postText,
    userId,
    songData,
    displayName: user.displayName,
    timeStamp : new Date().toUTCString()
  };

  let postObj = await postCollectionObj();

  let newPost = await postObj.insertOne(postSchema);

  if (newPost.insertedCount === 0) {
    throw `Error : Unable to add new post into database`;
  }

  return await this.getPostById(newPost.insertedId);
}
async function updatePost(postId, userId, newtext, newcommentArray, newLikeArray, songData) {
  postId = getValidId(postId);
  userId = getValidId(userId);
  commentIdArray = newcommentArray;
  likesIdArray = newLikeArray;
  postText = newtext;
  songData = songData;

  let postSchema = {
    commentsArray: commentIdArray,
    likesArray : likesIdArray,
    text: postText,
    userId,
    songData
  };

  let postObj = await postCollectionObj();

  let newPost = await postObj.updateOne(
    { _id: postId },
    { $set: postSchema }
  );

  if (!newPost.modifiedCount && !newPost.matchedCount) {
    throw `Error : Unable to update post with id : ${id} into database`;
  }

  return await this.getPostById(postId);
}

async function deletePost(id) {
  id = getValidId(id);
 
  let postObj = await postCollectionObj();

  let removedPost = await postObj.removeOne({ _id: id });

  if (removedPost.deletedCount === 0) {
    throw `Error : Unable to delete post with id : ${id} from database`;
  }

  return true;
}


module.exports = {
  getAllPost,
  getPostById,
  createPost,
  updatePost,
  deletePost
};

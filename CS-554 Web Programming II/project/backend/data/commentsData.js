const userData = require('./userData');

const { v1: uuidv4 } = require("uuid");
function getValidId(id) {
  if (!id) {
    throw "Given comment id is invalid";
  }

  if (typeof id != "object" && typeof id != "string") {
    throw "Provide comment id of type object or string ";
  }

  return id;
}

async function getCommentById(commentId, commentArray) {
  for(let item of commentArray){
    if(item._id.toString() === commentId.toString()){
      return item
    }
  }
  throw `Error : Cannot find comment with id : ${commentId}`
}

async function addComment(userId, commentText) {
userId = getValidId(userId);
const user = await userData.getUserById(userId);

let schema = {
  _id: uuidv4(),
  userId : userId,
  commentText : commentText,
  displayName: user.displayName,
  timeStamp : new Date().toUTCString()
};

return schema;
}

async function deleteComment(commentId, commentArray) {
  commentId = getValidId(commentId);
  for (let item of commentArray) {
    let index = commentArray.indexOf(item);
    if (commentId === item._id.toString()) {
      commentArray.splice(index, 1);
      break;
    }
  }
  return commentArray;
}


module.exports = {
  getCommentById,
  addComment,
  deleteComment
};

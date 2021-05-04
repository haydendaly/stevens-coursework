const { v1: uuidv4 } = require("uuid");
function getValidId(id) {
  if (!id) {
    throw "Given like id is invalid";
  }

  if (typeof id != "object" && typeof id != "string") {
    throw "Provided liked id of type object or string ";
  }

  return id;
}

async function getLikeById(likeId, likeArray) {
  for(let item of likeArray){
    if(item._id.toString() === likeId.toString()){
      return item
    }
  }
  throw `Error : Cannot find like with id : ${likeId}`
}

async function addLike(postId, userId) {
userId = getValidId(userId);
postId = getValidId(postId);

let schema = {
  _id: uuidv4(),
  userId : userId,
};

return schema;
}

async function deleteLike(likeId, likeArray) {
  likeId = getValidId(likeId);
  for (let item of likeArray) {
    let index = likeArray.indexOf(item);
    if (likeId === item._id.toString()) {
      likeArray.splice(index, 1);
      break;
    }
  }
  return likeArray
}


module.exports = {
  getLikeById,
  addLike,
  deleteLike
};

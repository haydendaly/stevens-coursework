const dbCollections = require("../config/collection");
const usersCollection= dbCollections.users;
const postCollection = dbCollections.post;
const validator = require("./validator");

async function getAllUsers() {
  const users = await usersCollection();
  const allUserData = await users.find({}).toArray();

  if (allUserData === null) {
    throw 'No user found in database';
  }
  return allUserData;
}

async function getAllUserIds(){
  const users = await usersCollection();
  const allUserIds = await users.find({}, {_id:1}).map(function(item){ return item._id; }).toArray();
  if (allUserIds === null){
    throw 'No user found in database';
  }
  return allUserIds;
}

async function getUserById(id) {
  if (!validator.isNonEmptyString(id)) throw 'Given user id is not valid';
  const users = await usersCollection();
  let userData = await users.findOne({ _id: id });

  if (!userData) {
    throw `Error :Cannot find user with given id : ${id} into database`;
  }

  return userData;
}

async function createUser(authUserData) {
  
 // auth user data only consists user id, displayName, email and photoUrl
  if( !validator.isNonEmptyString(authUserData.id)) throw 'User id is not valid'
  if( !validator.isNonEmptyString(authUserData.displayName)) throw 'User name is empty'
  if( !validator.isValidEmail(authUserData.email)) throw 'User email is not valid'

  let userData = {
    _id: authUserData.id,
    displayName: authUserData.displayName,
    email: authUserData.email,
    biography: "",
    websiteUrl: "",
    socialMedia: { facebook: "", instagram:"", twitter:"" },
    photoUrl: authUserData.photoUrl,
    country: "United States",
    photoData: ""
  };

  let users = await usersCollection();

  let newUser = await users.insertOne(userData);

  if (newUser.insertedCount === 0) {
    throw `Error : Unable to add user into database`;
  }

  return await this.getUserById(newUser.insertedId);
}
async function updateUser(userId, updatedUserData) {
  if(!validator.isNonEmptyString(userId)) throw 'User id is not valid';

  if(updatedUserData.displayName && !validator.isNonEmptyString(updatedUserData.displayName)) throw 'Updated user name is not valid';
  if(updatedUserData.websiteUrl && !validator.isValidURL(updatedUserData.websiteUrl)) throw 'Updated personal website is not valid url';
  
  if(updatedUserData.socialMedia){
    for( let key in updatedUserData.socialMedia ){
      let value = updatedUserData.socialMedia[key];
      if (value && !validator.isValidURL(value)) throw `${key} url is not valid`
    }
  }

  let users = await usersCollection();
  const oldUser = await this.getUserById(userId);
  let updatedUser = await users.updateOne({ _id: userId }, { $set: updatedUserData });
  if (!updatedUser.modifiedCount && !updatedUser.matchedCount) {
    throw `Error : Unable to update user with id : ${id} into database`;
  }

  if(updatedUserData.displayName && updatedUserData.displayName !== oldUser.displayName){
    await this.updateUserDisplayNameInPost(userId, updatedUserData.displayName);
  }

  return await this.getUserById(userId);
}

async function deleteUser(id) {
  if(!validator.isNonEmptyString(id)) throw 'User id is not valid'

  const users = await usersCollection();

  let removedUser = await users.removeOne({ _id: id });

  if (removedUser.deletedCount === 0) {
    throw `Error : Unable to delete user with id : ${id} from database`;
  }

  return true;
}

async function updateUserDisplayNameInPost(userId, displayName) {
  const postObj = await postCollection();

  // update display name for each post that corresponds to the userId
  await postObj.updateMany({"userId": userId}, { $set: {"displayName": displayName}});
  // update display name for each comment that corresponds to the userId
  await postObj.updateMany({"commentsArray.userId": userId}, { $set: {"commentsArray.$.displayName": displayName}});
  
  return true;
}

module.exports = {
  getAllUsers,
  getAllUserIds,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateUserDisplayNameInPost
};

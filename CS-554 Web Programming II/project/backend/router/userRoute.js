const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;
const upload = require('../config/upload');
const fs = require('fs').promises;
const path = require('path');
const xss = require('xss')
const validator = require('../data/validator');

router.get("/", async (req, res) => {
  try {
    let allUsers = await usersData.getAllUsers()
    res.json(allUsers);
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/ids", async (req, res) => {
  try {
    let allUserIds = await usersData.getAllUserIds()
    res.json(allUserIds);
  } catch (error) {
    res.status(404).json({ error: "Users not found" });
  }
});

router.get("/:id", async (req, res) => {
  const id = xss(req.params.id)
  if (!validator.isNonEmptyString(id)) {
    res.status(400).json({ error: "User is is not valid" });
    return;
  }

  try {
    let user = await usersData.getUserById(id)
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: "User not found for given id" });
  }
});

router.post("/create", async (req, res) => {
  if (
    !req.body ||
    !req.body.id ||
    !req.body.displayName||
    !req.body.email
  ) {
    res.status(404).json({ error: "Must supply all fields." });
    return;
  }

  const {id, displayName, email, photoUrl} = req.body;
  const error = [];
  if(!validator.isNonEmptyString(id)) error.push('id is not valid');
  if(!validator.isNonEmptyString(displayName)) error.push('Display name is not valid');
  if(!validator.isValidEmail(email)) error.push('Email is not valid');
  // photoUrl is provided from third party and cannot be changed, so skip check

  if (error.length > 0) {
    res.status(400).json({error: error})
  } else {

    const inputData = {
      id: xss(id),
      displayName: xss(displayName),
      email: xss(email),
      photoUrl: xss(photoUrl)
    };

    try {
      let newUser = await usersData.createUser(inputData)    
      res.json(newUser);
    } catch (e) {
      res.status(500).json({ error: e});
    }
  }
});

router.delete("/:id" , async(req, res) => {
  const id = xss(req.params.id); 
  
  if(!validator.isNonEmptyString(id)){
    res.status(400).json({ error: 'User id is not valid' });
    return;
   }

   try {
     let deleted = await usersData.deleteUser(id)
     if(deleted){
       res.json({deleted : "true"})
     }    
   } catch (e) {
    res.status(500).json({ error:  `Cannot delete user : ${e}` });
   }

})

// update user
router.patch("/:id", async (req, res) => {
  const id = xss(req.params.id);
  const updatedUserData = req.body;
  if (!validator.isNonEmptyString(id) || !updatedUserData || Object.keys(updatedUserData).length === 0) {
    res.status(400).json({
      error: "Must provide at least one field in request body.",
    });
    return;
  }
 
  try {
    await usersData.getUserById(id)
  } catch(e){
    res.status(404).json({
      error: "No user found for given id.",
    });
    return;
  }

  let error = [];
  if(updatedUserData.displayName && !validator.isNonEmptyString(updatedUserData.displayName)) error.push('Updated user name is not valid');
  if(updatedUserData.websiteUrl && !validator.isValidURL(updatedUserData.websiteUrl)) error.push('Updated personal website is not valid url');
  
  if(updatedUserData.socialMedia){
    for( let key in updatedUserData.socialMedia ){
      let value = updatedUserData.socialMedia[key];
      if (value && !validator.isValidURL(value)) error.push( `${key} url is not valid` );
    }
  };

  if( error.length > 0){
    res.status(400).json({error: error})
  } else {
    try {
      const newData = {socialMedia: {}};
      
      if( updatedUserData.socialMedia ){
        for( let key in updatedUserData.socialMedia ){
          let value = updatedUserData.socialMedia[key];
          newData.socialMedia[key] = xss(value);
        }
      };
      newData.displayName = xss(updatedUserData.displayName);
      newData.websiteUrl = xss(updatedUserData.websiteUrl);
      newData.biography = xss(updatedUserData.biography);
      newData.country = xss(updatedUserData.country);

      let updatedUser = await usersData.updateUser(id, newData)
      res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json({ e: "Cannot update user." });
    }
  }
});

router.post("/photo/:id", upload.single('image'), async(req, res)=>{
  const id = xss(req.params.id);
  if (!validator.isNonEmptyString(id)){
    res.status(400).json({ error: "User id is not valid." });
    return;
  }
  
  if (req.file) {
    let data = await fs.readFile(path.join(__dirname, '..', 'uploads', req.file.filename))
    let type = req.file.mimetype
    
    const photoData = { photoData:
      {data: data,
      type: type}
    }

    try{
      await usersData.updateUser(id, photoData)
      res.status(200).json({message: 'Photo updated'})

    }catch(e){
      res.status(404).json({error: e})
    }

  }
});

router.get("/photo/:id", async(req, res) =>{
  const id = xss(req.params.id);
  if (!validator.isNonEmptyString(id)){
    res.status(400).json({ error: "User id is not valid." });
    return;
  }

  try{
    const user = await usersData.getUserById(id)
    const photoData = user.photoData;

    // user uploaded photo has highest priority
    // then the social media photo
    // then the default photo
    if (photoData){    
      res.contentType(photoData.type);
      res.send(photoData.data.buffer);
    } else if(user.photoUrl){
      try{
        res.redirect(user.photoUrl);
      }catch(e){
        res.sendFile(path.join(__dirname, '..', 'public', 'img', 'default_profile.jpeg'));
      }
    } else {
      res.sendFile(path.join(__dirname, '..', 'public', 'img', 'default_profile.jpeg'));
    }
  
  } catch(e){
    res.status(400).json({error: e });
  }

})


module.exports = router;

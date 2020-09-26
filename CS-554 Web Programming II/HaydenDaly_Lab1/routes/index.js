const express = require('express');

const movies = require('../functions/movies');
const { Movie, MoviePatch, Comment } = require('../functions/schema');
const { ObjectID } = require('mongodb');
const router = express.Router();

/* GET movies. */
router.get('/movies', async (req, res) => {
  let err;
  let { skip, take } = req.query;
  if (!skip) skip = 0;
  else if (!isNaN(skip) && Number.isInteger(parseInt(skip)) && parseInt(skip) >= 0) {
    skip = parseInt(skip);
  } else {
    err = { message: `Invalid value given for skip query: ${skip}. Must be a positive integer.`};
  }
  if (!take) take = 20;
  else if (!isNaN(take) && Number.isInteger(parseInt(skip)) && parseInt(take) >= 0 && parseInt(take) < 100) {
    take = parseInt(take);
  } else {
    err = { message: `Invalid value given for take query: ${take}. Must be a positive integer less than 100.`};
  }
  if (err) {
    res.status(400).send(err);
  } else {
    let data = await movies.getAll(skip, take);
    res.send(data);
  }
});

/* GET movie by id. */
router.get('/movies/:id', async (req, res) => {
  let err;
  if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id))) err = { message: 'Parameter id must be a defined string of form ObjectID.' };
  if (err) res.status(400).send(err);
  else {
    let data = await movies.get(req.params.id);
    if (!data) res.status(400).send({ message: 'ID does not exist within database.' });
    else res.send(data);
  }
});

/* POST movies */
router.post('/movies', async (req, res) => {
  let err;
  try {
    await Movie.validateSync(req.body);
  } catch (error) {
    err = error;
  };
  if (err) res.status(400).send(err);
  else {
    let data = await movies.create(req.body);
    res.send(data);
  };
});

/* PUT movie by id */
router.put('/movies/:id', async (req, res) => {
  let err;
  if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id))) err = { message: 'Parameter id must be a defined string of form ObjectID.' };
  try {
    await Movie.validateSync(req.body);
  } catch (error) {
    err = error;
  };
  if (err) res.status(400).send(err);
  else {
    let data = await movies.update(req.params.id, req.body);
    if (!data) res.status(400).send({ message: `ID: ${req.params.id} does not exist within database.` });
    else res.send(data.value);
  };
});

/* PATCH movie by id */
router.patch('/movies/:id', async (req, res) => {
  let err;
  if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id))) err = { message: 'Parameter id must be a defined string of form ObjectID.' };
  try {
    await MoviePatch.validateSync(req.body);
  } catch (error) {
    err = error;
  };
  if (err) res.status(400).send(err);
  else {
    let data = await movies.patch(req.params.id, req.body);
    if (!data) res.status(400).send({ message: 'ID does not exist within database.' });
    else res.send(data.value);
  };
});

/* POST movie comment by id */
router.post('/movies/:id/comments', async (req, res) => {
  let err;
  if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id))) err = { message: 'Parameter id must be a defined string of form ObjectID.' };
  try {
    await Comment.validateSync(req.body);
  } catch (error) {
    err = error;
  }
  if (err) res.status(400).send(err);
  else {
    let data = await movies.createComment(req.params.id, req.body);
    if (!data) res.status(400).send({ message: 'ID does not exist within database.' });
    else res.send(data.value);
  }
});

/* DELETE movie comment by id */
router.delete('/movies/:movieId/:commentId', async (req, res) => {
  let err;
  if (!(typeof req.params.movieId === 'string' && ObjectID.isValid(req.params.movieId))) err = { message: 'Parameter movieId must be a defined string of form ObjectID.' };
  if (!(typeof req.params.commentId === 'string' && ObjectID.isValid(req.params.commentId))) err = { message: 'Parameter commentId must be a defined string of form ObjectID.' };
  
  if (err) res.status(400).send(err);
  else {
    let data = await movies.deleteComment(req.params.movieId, req.params.commentId); 
    if (!data) res.status(400).send({ message: 'ID does not exist within database.' });
    else res.send(data.value);
  }
});

module.exports = router;

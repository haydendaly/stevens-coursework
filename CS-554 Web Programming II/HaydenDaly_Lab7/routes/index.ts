import * as express from 'express';

const movies = require('../functions/movies');
const { Movie, MoviePatch, Comment } = require('../functions/schema');
const { ObjectID } = require('mongodb');
const router = express.Router();

/* GET movies. */
router.get('/movies', async (req: express.Request, res: express.Response) => {
  let err;
  const skip = req.query.skip as string;
  const take = req.query.take as string;
  let skip2 = 0;
  let take2 = 20;
  if (!skip) {
  } else if (
    !isNaN(parseInt(skip)) &&
    Number.isInteger(parseInt(skip)) &&
    skip2 >= 0
  ) {
    skip2 = parseInt(skip);
  } else {
    err = {
      message: `Invalid value given for skip query: ${skip}. Must be a positive integer.`
    };
  }
  if (!take) {
  } else if (
    !isNaN(parseInt(take)) &&
    Number.isInteger(parseInt(take)) &&
    parseInt(take) >= 0 &&
    parseInt(take) < 100
  ) {
    take2 = parseInt(take);
  } else {
    err = {
      message: `Invalid value given for take query: ${take}. Must be a positive integer less than 100.`
    };
  }
  if (err) {
    res.status(400).send(err);
  } else {
    let data = await movies.getAll(skip2, take2);
    res.send(data);
  }
});

/* GET movie by id. */
router.get(
  '/movies/:id',
  async (req: express.Request, res: express.Response) => {
    let err;
    if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id)))
      err = {
        message: 'Parameter id must be a defined string of form ObjectID.'
      };
    if (err) res.status(400).send(err);
    else {
      let data = await movies.get(req.params.id);
      if (!data)
        res.status(404).send({ message: 'ID does not exist within database.' });
      else res.send(data);
    }
  }
);

/* POST movies */
router.post('/movies', async (req: express.Request, res: express.Response) => {
  let err;
  try {
    await Movie.validateSync(req.body);
  } catch (error) {
    console.log(error, '!');
    err = error;
  }
  if (err) res.status(400).send(err);
  else {
    let data = await movies.create(req.body);
    res.send(data);
  }
});

/* PUT movie by id */
router.put(
  '/movies/:id',
  async (req: express.Request, res: express.Response) => {
    let err;
    if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id)))
      err = {
        message: 'Parameter id must be a defined string of form ObjectID.'
      };
    try {
      await Movie.validateSync(req.body);
    } catch (error) {
      err = error;
    }
    if (err) res.status(400).send(err);
    else {
      let data = await movies.update(req.params.id, req.body);
      if (!data)
        res.status(400).send({
          message: `ID: ${req.params.id} does not exist within database.`
        });
      else res.send(data.value);
    }
  }
);

/* PATCH movie by id */
router.patch(
  '/movies/:id',
  async (req: express.Request, res: express.Response) => {
    let err;
    if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id)))
      err = {
        message: 'Parameter id must be a defined string of form ObjectID.'
      };
    try {
      await MoviePatch.validateSync(req.body);
    } catch (error) {
      err = error;
    }
    if (err) res.status(400).send(err);
    else {
      let data = await movies.patch(req.params.id, req.body);
      if (!data)
        res.status(404).send({ message: 'ID does not exist within database.' });
      else res.send(data.value);
    }
  }
);

/* POST movie comment by id */
router.post(
  '/movies/:id/comments',
  async (req: express.Request, res: express.Response) => {
    let err;
    if (!(typeof req.params.id === 'string' && ObjectID.isValid(req.params.id)))
      err = {
        message: 'Parameter id must be a defined string of form ObjectID.'
      };
    try {
      await Comment.validateSync(req.body);
    } catch (error) {
      err = error;
    }
    if (err) res.status(400).send(err);
    else {
      let data = await movies.createComment(req.params.id, req.body);
      if (!data)
        res.status(404).send({ message: 'ID does not exist within database.' });
      else res.send(data.value);
    }
  }
);

/* DELETE movie comment by id */
router.delete(
  '/movies/:movieId/:commentId',
  async (req: express.Request, res: express.Response) => {
    let err;
    if (
      !(
        typeof req.params.movieId === 'string' &&
        ObjectID.isValid(req.params.movieId)
      )
    )
      err = {
        message: 'Parameter movieId must be a defined string of form ObjectID.'
      };
    if (
      !(
        typeof req.params.commentId === 'string' &&
        ObjectID.isValid(req.params.commentId)
      )
    )
      err = {
        message:
          'Parameter commentId must be a defined string of form ObjectID.'
      };

    if (err) res.status(400).send(err);
    else {
      let movie = await movies.get(req.params.movieId);
      if (!movie) {
        res.status(404).send({ message: 'ID does not exist within database.' });
      } else if (
        !(movie.comments.map((o: any) => o._id.toString()).includes(req.params.commentId))
      ) {
        res
          .status(404)
          .send({ message: 'Comment ID does not exist within database.' });
      }
      else {
        let data = await movies.deleteComment(
          req.params.movieId,
          req.params.commentId
        );
        console.log(data);
        if (!data)
          res
            .status(404)
            .send({ message: 'ID does not exist within database.' });
        else res.send(data.value);
      }
    }
  }
);

export default router;

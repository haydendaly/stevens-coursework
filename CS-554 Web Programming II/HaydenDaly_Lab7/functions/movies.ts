import { ObjectID } from 'mongodb';
import mongoCollections from './mongoCollections';
const { movies } = mongoCollections;

export const getAll = async (skip, take) => {
  if (take === 0) return [];
  const movieCollection = await movies();
  return await movieCollection
    .find({})
    .skip(skip)
    .limit(take)
    .toArray();
};
export const get = async id => {
  const movieCollection = await movies();
  return await movieCollection.findOne({ _id: new ObjectID(id) });
};
export const create = async body => {
  const movieCollection = await movies();
  return await movieCollection.insertOne({
    ...body,
    comments: []
  });
};
export const update = async (id, body) => {
  const movieCollection = await movies();
  return await movieCollection.findOneAndUpdate(
    { _id: new ObjectID(id) },
    { $set: body },
    { returnOriginal: false }
  );
};
export const patch = async (id, body) => {
  const movieCollection = await movies();
  let data = await movieCollection.findOne({ _id: new ObjectID(id) });
  if (!data) return false;
  let cast = data.cast;
  for (let i in body.cast) {
    if (!cast.find(o => JSON.stringify(o) === JSON.stringify(body.cast[i])))
      cast.push(body.cast[i]);
  }
  return await movieCollection.findOneAndUpdate(
    { _id: new ObjectID(id) },
    { $set: { ...data, ...body, cast } },
    { returnOriginal: false }
  );
};
export const createComment = async (id, body) => {
  const movieCollection = await movies();
  let valid = await movieCollection.findOne({ _id: new ObjectID(id) });
  if (!valid) return false;
  return await movieCollection.findOneAndUpdate(
    { _id: new ObjectID(id) },
    { $push: { comments: { ...body, _id: new ObjectID() } } },
    { returnOriginal: false }
  );
};
export const deleteComment = async (movieId, commentId) => {
  const movieCollection = await movies();
  let valid = await movieCollection.findOne({ _id: new ObjectID(movieId) });
  if (!valid) return false;
  return await movieCollection.findOneAndUpdate(
    { _id: new ObjectID(movieId) },
    { $pull: { comments: { _id: new ObjectID(commentId) } } },
    { returnOriginal: false }
  );
};

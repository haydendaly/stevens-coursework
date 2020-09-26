const { ObjectID } = require('mongodb');
const mongoCollections = require('./mongoCollections');
const { movies } = mongoCollections;

module.exports = {
  getAll: async (skip, take) => {
    if (take === 0) return [];
    const movieCollection = await movies();
    return await movieCollection
      .find({})
      .skip(skip)
      .limit(take)
      .toArray();
  },
  get: async id => {
    const movieCollection = await movies();
    return await movieCollection.findOne({ _id: ObjectID(id) });
  },
  create: async body => {
    const movieCollection = await movies();
    return await movieCollection.insertOne({ 
      ...body,
      comments: []
    });
  },
  update: async (id, body) => {
    const movieCollection = await movies();
    return await movieCollection.findOneAndUpdate({ _id: ObjectID(id) },
      { $set: body },
      { returnOriginal: false });
  },
  patch: async (id, body) => {
    const movieCollection = await movies();
    let data = await movieCollection.findOne({ _id: ObjectID(id) });
    if (!data) return false;
    let cast = data.cast;
    for (i in body.cast) {
      if (!cast.find(o => JSON.stringify(o) === JSON.stringify(body.cast[i]))) cast.push(body.cast[i]);
    }
    return await movieCollection.findOneAndUpdate({ _id: ObjectID(id) },
      { $set: { ...data, ...body, cast} },
      { returnOriginal: false });
  },
  createComment: async (id, body) => {
    const movieCollection = await movies();
    let valid = await movieCollection.findOne({ _id: ObjectID(id) });
    if (!valid) return false;
    return await movieCollection.findOneAndUpdate({ _id: ObjectID(id) },
      { $push: { comments: { ...body, _id: new ObjectID() }}},
      { returnOriginal: false });
  },
  deleteComment: async (movieId, commentId) => {
    const movieCollection = await movies();
    let valid = await movieCollection.findOne({ _id: ObjectID(movieId) });
    if (!valid) return false;
    return await movieCollection.findOneAndUpdate({ _id: ObjectID(movieId) },
      { $pull: { comments: { _id: ObjectID(commentId) }}},
      { returnOriginal: false });
  }
}
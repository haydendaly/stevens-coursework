const dbConnection = require("./connection");

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

module.exports = {
  comments: getCollectionFn("comments"),
  post: getCollectionFn("posts"),
  likes: getCollectionFn("likes"),
  users: getCollectionFn("users"),
};

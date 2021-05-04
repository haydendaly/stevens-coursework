const { ApolloServer, gql } = require('apollo-server');
const lodash = require('lodash');
const uuid = require('uuid');

const redis = require('redis');
const bluebird = require('bluebird');

const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const fetch = require('node-fetch');
global.fetch = fetch;

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const unsplash = new Unsplash({ accessKey: "EwieWI0lsCaGz6qpQS6pec7G9DkvXsvCKhmwmzOp3sU" });

// store array of binned image ids in here
// store array of posted image ids in here
// store all binned/posted by id in redis
let binned = []
let userPosted = []

const typeDefs = gql`
  type Query {
    unsplashImages(pageNum: Int): [ImagePost]
    binnedImages: [ImagePost]
    userPostedImages: [ImagePost]
  }

  type ImagePost {
    id: ID!
    url: String!
    posterName: String!
    description: String
    userPosted: Boolean!
    binned: Boolean!
  }

  type Mutation {
    uploadImage(
      url: String!
      posterName: String!
      description: String
    ): ImagePost
    updateImage(
      id: ID!
      url: String
      posterName: String
      description: String
      userPosted: Boolean
      binned: Boolean
    ): ImagePost
    deleteImage(
      id: ID!
    ): ImagePost
  }
`;

const resolvers = {
  Query: {
    unsplashImages: (_, args) => {
      return new Promise((resolve, reject) => {
        unsplash.photos.listPhotos(args.pageNum, 15, "latest")
          .then(toJson)
          .then(async json => {
            let data = json.map(o => ({
              id: o.id,
              url: o.urls.raw,
              posterName: o.user.name,
              description: o.description ? o.description : "",
              userPosted: false,
              binned: false
            }))
            for (var i = 0; i < data.length; i++) {
              if (binned.includes(data[i].id)) {
                data[i].binned = true
              }
              if (userPosted.includes(data[i].id)) {
                data[i].userPosted = true
              }
              await client.setAsync(
                data[i].id,
                JSON.stringify(data[i]),
              );
            }
            return resolve(data)
          });
      })
    },
    binnedImages: async (_, args) => {
      let result = []
      for (var i = 0; i < binned.length; i++) {
        const temp = await client.getAsync(binned[i])
        result.push(JSON.parse(temp))
      }
      return result
    },
    userPostedImages: async (_, args) => {
      let result = []
      for (var i = 0; i < userPosted.length; i++) {
        const temp = await client.getAsync(userPosted[i])
        result.push(JSON.parse(temp))
      }
      return result
    }
  },
  Mutation: {
    uploadImage: async (_, args) => {
      const newImage = {
        id: uuid.v4(),
        url: args.url,
        posterName: args.posterName,
        description: args.description || "",
        userPosted: true,
        binned: false
      };
      userPosted.push(newImage.id)
      await client.setAsync(
        newImage.id,
        JSON.stringify(newImage),
      );
      return newImage;
    },
    updateImage: async (_, args) => {
      const temp = await client.getAsync(args.id)
      let newImage = JSON.parse(temp)
      if (args.url) {
        newImage.url = args.url;
      }
      if (args.posterName) {
        newImage.posterName = args.posterName;
      }
      if (args.description) {
        newImage.description = args.description;
      }
      if (typeof args.userPosted !== 'undefined' && args.userPosted !== null) {
        newImage.userPosted = args.userPosted;
        if (newImage.userPosted) {
          userPosted.push(args.id)
        } else {
          lodash.remove(userPosted, id => id == args.id)
        }
      }
      if (typeof args.binned !== 'undefined' && args.binned !== null) {
        newImage.binned = args.binned;
        if (newImage.binned) {
          binned.push(args.id)
        } else {
          lodash.remove(binned, id => id == args.id)
        }
      }
      await client.setAsync(
        args.id,
        JSON.stringify(newImage),
      );
      return newImage;
    },
    deleteImage: async (_, args) => {
      let result = {}
      if (binned.includes(args.id)) {
        result = lodash.remove(binned, id => id == args.id)[0]
      } else if (userPosted.includes(args.id)) {
        result = lodash.remove(userPosted, id => id == args.id)[0]
      }
      await redis.remove(args.id)
      return result
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url} 🚀`);
});

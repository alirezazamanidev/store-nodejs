const { GraphQLList } = require("graphql");
const { BlogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async () => {
    Model.find({}).populate([
      { path: "author" },
      { path: "category", select: ["title"] },
    ]);
    return blogs;
  },
};
module.exports = {
  BlogResolver,
};

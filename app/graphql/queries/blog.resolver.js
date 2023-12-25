const { GraphQLList } = require("graphql");
const { BlogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async() => {
    return await BlogModel.find({}).populate('author')
  },
};
module.exports={
    BlogResolver
}
const { GraphQLList, GraphQLString } = require("graphql");
const { BlogModel } = require("../../models/blogs");
const { BlogType } = require("../typeDefs/blog.type");

const BlogResolver = {
  type: new GraphQLList(BlogType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const { category } = args;
    const findQuery = category ? { category } : {};
    const blogs = await BlogModel.find(findQuery).populate([
      { path: "author" },
      { path: "category", select: ["title"] },
    ]);
    return blogs;
  },
};
module.exports = {
  BlogResolver,
};

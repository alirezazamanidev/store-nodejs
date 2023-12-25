const { GraphQLList } = require("graphql");
const {CategoryModel}=require('../../models/categories');
const { CategoryType } = require("../typeDefs/category.type");
const CategoryResolver = {
  type: new GraphQLList(CategoryType),
  resolve: async () => {
    const categories = await CategoryModel.find({parent:undefined});
    return categories;
  },
};
module.exports = {
  CategoryResolver,
};

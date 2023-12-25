const { GraphQLList, GraphQLString } = require("graphql");
const { ProductModel } = require("../../models/products");
const { ProductType } = require("../typeDefs/product.type");

const ProductResolver = {
  type: new GraphQLList(ProductType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_,args) => {
    const { category } = args;
    const findQuery = category ? { category } : {};
    const products = await ProductModel.find(findQuery).populate([{path:'category'},{path:"supllier"}])

    return products;
  },
};
module.exports = {
  ProductResolver,
};

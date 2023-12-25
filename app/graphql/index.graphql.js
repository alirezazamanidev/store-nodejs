const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const RootQuery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        blogs:BlogResolver,
        products:ProductResolver,
        categories:CategoryResolver,
        childOfCategory:CategoryChildResolver,
        courses:CourseResolver
    }
    
})

const RootMutation=new GraphQLObjectType({
  name:"Mutaion",
  fields:{

  }
});

const graphqlSchema=new GraphQLSchema({
    query:RootQuery,
    // mutation:RootMutation
});

module.exports={
    graphqlSchema
}
const { GraphQLObjectType, GraphQLSchema } = require("graphql");

const RootQuery=new GraphQLObjectType({
    name:"RootQuery",
    fields:{

    }
})

const RootMutation=new GraphQLObjectType({
  name:"Mutaion",
  fields:{

  }
});

const graphqlSchema=new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
});

module.exports={
    graphqlSchema
}
const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLScalarType, Kind, GraphQLList, }=require('graphql');
const { toObject, parseLiteral } = require('../utils');
const UserType=new GraphQLObjectType({
    name:'UserType',
    fields:{
        _id:{type:GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
       
    }
})
const PublicCategoryType=new GraphQLObjectType({
    name:'PublicCategoryType',
    fields:{
        _id:{type:GraphQLString},
        title:{type:GraphQLString},
     
    }
})
const AnyType = new GraphQLScalarType({
    name: "anyType",
    parseValue : toObject,
    serialize : toObject,
    parseLiteral : parseLiteral,
})

const ResponseType=new GraphQLObjectType({
    name:'ResponseType',
    fields:{
       data:{type:AnyType}
    }
   })
module.exports={
    UserType,
    AnyType,
    ResponseType,
    PublicCategoryType
}
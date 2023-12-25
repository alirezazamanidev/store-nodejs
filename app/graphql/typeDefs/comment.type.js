const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInputObjectType, GraphQLInt}=require('graphql');
const { UserType } = require('./public.types');

const CommentAnswerType=new GraphQLObjectType({
    name:'commentAnswerType',
    fields:{
        _id:{type:GraphQLString},
        user:{type:UserType},
        comment:{type:GraphQLString},
        show:{type:GraphQLBoolean},
        createdAt:{type:GraphQLString}
       
       
    }
})

const CommentType=new GraphQLObjectType({
    name:'commentType',
    fields:{
        _id:{type:GraphQLString},
        user:{type:UserType},
        comment:{type:GraphQLString},
        answers:{type:new GraphQLList(CommentAnswerType)}, 
        show:{type:GraphQLBoolean},
        openToComment:{type:GraphQLBoolean},
        createdAt:{type:GraphQLString}
        
       
    }
})

module.exports={

    CommentType
}

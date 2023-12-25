const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInputObjectType, GraphQLInt}=require('graphql');
const { UserType } = require('./public.types');

const ParentOfCommentType=new GraphQLObjectType({
    name:'parentOfCommengtType',
    fields:{
        _id:{type:GraphQLString},
        user:{type:UserType},
        comment:{type:GraphQLString},
       
       
    }
})

const CommentType=new GraphQLObjectType({
    name:'commentType',
    fields:{
        _id:{type:GraphQLString},
        user:{type:UserType},
        comment:{type:GraphQLString},
        parent:{type:ParentOfCommentType}, 
        show:{type:GraphQLBoolean},
        openToComment:{type:GraphQLBoolean},
        
       
    }
})

module.exports={

    CommentType
}

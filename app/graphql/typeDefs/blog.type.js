const {GraphQLObjectType, GraphQLString, GraphQLList}=require('graphql');
const { UserType, PublicCategoryType } = require('./public.types');
const { CommentType } = require('./comment.type');
const BlogType=new GraphQLObjectType({
    name:'BlogType',
    fields:{
        _id:{type:GraphQLString},
        author:{type:UserType},
        title:{type:GraphQLString},
        short_text:{type:GraphQLString},
        text:{type:GraphQLString},
        image:{type:GraphQLString},
        imageURL:{type:GraphQLString},
        comments:{type:new GraphQLList(CommentType)},
        tags:{type:new GraphQLList(GraphQLString)},
        title:{type:GraphQLString},
        likes : {type: new GraphQLList(UserType)},
        dislikes : {type: new GraphQLList(UserType)},
        bookmarks : {type: new GraphQLList(UserType)},

        category:{type:PublicCategoryType},
    }
})

module.exports={
    BlogType
}

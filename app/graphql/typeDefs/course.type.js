const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { PublicCategoryType, AuthorType } = require("./public.types");
const EpisodesType=new GraphQLObjectType({
    name:'EpisodeType',
    fields:{
        _id:{type:GraphQLString},
        title:{type:GraphQLString},
        text:{type:GraphQLString},
        type:{type:GraphQLString},
        time:{type:GraphQLString},
        videoAddress:{type:GraphQLString},
        videoURL:{type:GraphQLString},    }
})
const ChaptersType=new GraphQLObjectType({
    name:'chapterType',
    fields:{
        _id:{type:GraphQLString},
        title:{type:GraphQLString},
        text:{type:GraphQLString},
        episodes:{type:new GraphQLList(EpisodesType)}
    
    }
})
const CourseType = new GraphQLObjectType({
    name: "courseType",
    fields: {
        _id: {type: GraphQLString},
        title : {type : GraphQLString},
        short_text : {type : GraphQLString},
        text : {type : GraphQLString},
        image : {type :GraphQLString},
        imageUrl:{type:GraphQLString},
        tags : {type : new GraphQLList(GraphQLString)},
        category : {type : PublicCategoryType},
        price : {type : GraphQLInt},
        disCunt : {type : GraphQLInt},
        type : {type : GraphQLString},
        status : {type : GraphQLString},
        teacher : {type : AuthorType},
         chapters: {type: new GraphQLList(ChaptersType)},
        
    }
})

module.exports = {
    CourseType
}
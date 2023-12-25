const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoryResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlog,CreateCommentForCourse, CreateCommentForProduct } = require("./mutaitons/comment.resolver");
const { LikeProduct, LikeBlog, LikeCourse } = require("./mutaitons/likes.resolver");
const { DisLikeBlog, DisLikeCourse, DisLikeProduct } = require("./mutaitons/dislikes.resolver");
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
    CreateCommentForBlog,
    CreateCommentForCourse,
    CreateCommentForProduct,
    LikeProduct,
    LikeBlog,
    LikeCourse,
    DisLikeBlog,
    DisLikeCourse,
    DisLikeProduct

}
});

const graphqlSchema=new GraphQLSchema({
    query:RootQuery,
    mutation:RootMutation
});

module.exports={
    graphqlSchema
}
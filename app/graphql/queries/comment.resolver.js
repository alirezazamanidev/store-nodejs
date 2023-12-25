const { GraphQLString } = require("graphql");

const { BlogModel } = require("../../models/blogs");
const createHttpError = require("http-errors");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { copyObject } = require("../../utils/functions");

const CreateCommentForBlog = {
  type: ResponseType,
  args: {
    comment: { type: GraphQLString },
    blogID: { type: GraphQLString },
    parent: { type: GraphQLString },

  },
  resolve: async(_, args, {req}) => {
    const user=await VerifyAccessTokenInGraphQL(req);
    const {comment,blogID,parent}=args;
    await checkExixtBlog(blogID);
    
    const  commentDoc= await GetComment(BlogModel,parent);
    console.log(commentDoc);
    await BlogModel.updateOne({_id:blogID},{$push:{
        comments:{
            comment,
            user:user._id,
            show:false,
            openToComment: !parent
        }
    }})
    return {
        data:{
            statusCode:HttpStatus.CREATED,
            message:"The comment  has been created!"
        }
    };
  },
};
async function checkExixtBlog(id){
    const blog= await BlogModel.findById(id);
    if(!blog) throw createHttpError.NotFound('Blog is not founded');
    return blog;
}
async function GetComment(model,commentId){
    const findedcomment= await model.findOne({'comments._id':commentId},{'comments.$':1});
    const comment=copyObject(findedcomment);
    console.log(comment);
    if(!comment?.comments?.[0]) throw createHttpError.NotFound('comment not found!');
    return comment?.comments?.[0];
}
module.exports={
    CreateCommentForBlog
}
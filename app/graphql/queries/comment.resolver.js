const { GraphQLString } = require("graphql");

const { BlogModel } = require("../../models/blogs");
const createHttpError = require("http-errors");
const { VerifyAccessTokenInGraphQL } = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");

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
module.exports={
    CreateCommentForBlog
}
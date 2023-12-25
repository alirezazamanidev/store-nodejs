const { GraphQLString } = require("graphql");

const { BlogModel } = require("../../models/blogs");
const createHttpError = require("http-errors");
const {
  VerifyAccessTokenInGraphQL,
} = require("../../http/middlewares/verifyAccessToken");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const { ResponseType } = require("../typeDefs/public.types");
const { copyObject } = require("../../utils/functions");
const mongoose = require("mongoose");
const CreateCommentForBlog = {
    type: ResponseType,
    args : {
        comment: {type: GraphQLString},
        blogID: {type: GraphQLString},
        parent: {type: GraphQLString},
    },
    resolve : async (_, args, context) => {
        const {req} = context;
         const user = await VerifyAccessTokenInGraphQL(req)
        const {comment, blogID, parent} = args
        if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadRequest("شناسه بلاگ ارسال شده صحیح نمیباشد")
        await checkExixtBlog(blogID)
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDocument = await getComment(BlogModel, parent)
            if(commentDocument && !commentDocument?.openToComment) throw createHttpError.BadRequest("ثبت پاسخ مجاز نیست")
            const createAnswerResult = await BlogModel.updateOne({
                "comments._id": parent
            }, {
                $push: {
                    "comments.$.answers": {
                        comment,
                        user: user._id,
                        show: false,
                        openToComment: false
                    }
                }
            });
            if(!createAnswerResult.modifiedCount) {
                throw createHttpError.InternalServerError("ثبت پاسخ انجام نشد")
            }
            return {
                data : {
                    statusCode: HttpStatus.CREATED,
                    message: "پاسخ شما با موفقیت ثبت شد"
                }
            }
        }else{
            await BlogModel.updateOne({_id: blogID}, {
                $push : {comments : {
                    comment, 
                    user: user._id, 
                    show : false,
                    openToComment : true
                }}
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data : {
                message: "ثبت نظر با موفقیت انجام شد پس از تایید در وبسایت قرار میگیرد"
            }
        }
    }
}
async function checkExixtBlog(id) {
  const blog = await BlogModel.findById(id);
  if (!blog) throw createHttpError.NotFound("Blog is not founded");
  return blog;
}
async function getComment(model, id) {
  const findedComment = await model.findOne(
    { "comments._id": id },
    { "comments.$": 1 }
  );
  const comment = copyObject(findedComment);
  if (!comment?.comments?.[0])
    throw createHttpError.NotFound("کامنتی با این مشخصات یافت نشد");
  return comment?.comments?.[0];
}
module.exports = {
  CreateCommentForBlog,
};

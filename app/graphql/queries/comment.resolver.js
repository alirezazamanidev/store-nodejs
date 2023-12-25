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
  args: {
    comment: { type: GraphQLString },
    blogID: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
  resolve: async (_, args, { req }) => {
    const user = await VerifyAccessTokenInGraphQL(req);
    const { comment, blogID, parent } = args;
    await checkExixtBlog(blogID);
    let commentDoc;
    if (parent && mongoose.isValidObjectId(parent)) {
      commentDoc = await getComment(BlogModel, parent);
    }
    if (commentDoc && !commentDoc?.openToComment)
      throw createHttpError.BadRequest("ثبت پاسخ امکان پذیر نیست");
    await BlogModel.updateOne(
      { _id: blogID },
      {
        $push: {
          comments: {
            comment,
            user: user._id,
            show: false,
            openToComment: !parent,
            parent: mongoose.isValidObjectId(parent) ? parent : undefined,
          },
        },
      }
    );
    return {
      data: {
        statusCode: HttpStatus.CREATED,
        message: "The comment  has been created!",
      },
    };
  },
};
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

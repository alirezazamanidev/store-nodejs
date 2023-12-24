const createHttpError = require("http-errors");
const { BlogModel } = require("../../../../models/blogs");
const { deleteFileInPublic, checkDataForUpdate } = require("../../../../utils/functions");
const { createBlogSchema } = require("../../../validators/admin/blog.schrma");
const Controller = require("../../controller");
const path = require("path");
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/gi, "/");
      const { title, text, short_text, tags, category } = blogDataBody;
      const image = req.body.image;
      const newblog = await BlogModel.create({
        author: req.user._id,
        image,
        title,
        short_text,
        text,
        tags,
        category,
      });
      return res.status(201).json({
        data: {
          statusCode: 201,
          meessage: "Blog has been created!",
          newblog,
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      const blogs = await BlogModel.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "author",
            as: "author",
          },
        },
        {
          $lookup: {
            from: "categories",
            foreignField: "_id",
            localField: "category",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
        {
          $unwind: "$author",
        },
        {
          $project: {
            "author.__v": 0,
            "category.__v": 0,
            "author.bills": 0,
            "author.otp": 0,
            "author.Roles": 0,
            "author.diacount": 0,
          },
        },
      ]);
      res.status(200).json({
        data: {
          statusCode: 200,
          blogs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(err);
    }
  }
  async findBlog(query = {}) {
    const blog = await BlogModel.findOne(query).populate([
      {
        path: "category",
        select: ["title"],
      },
      { path: "author", select: ["phone", "first_name", "last_name"] },
    ]);
    if (!blog) throw createHttpError.NotFound("Blog not found");
    delete blog.category.children;
    return blog;
  }

  async removeBlog(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog({ _id: id });
      const resultBlog = await BlogModel.deleteOne({ _id: blog._id });
      if (resultBlog.deletedCount == 0)
        throw createHttpError.InternalServerError();
      res.status(200).json({
        data: {
          statusCode: 200,
          message: "The blog has been deleted!",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateBlog(req, res, next) {
    try {
      const { id } = req.params;;
      await this.findBlog({ _id: id });

      if (req?.body?.fileUploadPath && req?.body?.filename) {
        req.body.image = path.join(req.body.fileUploadPath, req.body.filename);
        req.body.image = req.body.image.replace(/\\/gi, "/");
      }
      const data = req.body;
     
      let blackListField = ["bookmarks", "comments", "likes", "dislikes",'teacher'];
      checkDataForUpdate(data,blackListField);

      const resultUpdate = await BlogModel.updateOne({_id:id},{$set:data});
      if(resultUpdate.modifiedCount==0) throw createHttpError.InternalServerError();
      return res.status(200).json({
        data: {
          statusCode: 200,
          meessage: "Blog has been updated!",
      
        },
      });
    } catch (err) {
      deleteFileInPublic(req.body.image);
      next(err);
    }
  }
}

module.exports = {
  BlogController: new BlogController(),
};

const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schrma");
const Controller = require("../controller");
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
            $unwind:'$category'
          },
        {
            $unwind:'$author'
        },{
            $project:{
                "author.__v":0,
                "category.__v":0,
                "author.bills":0,
                "author.otp":0,
                "author.Roles":0,
                "author.diacount":0,
            }
        }
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
}

module.exports = {
  BlogController: new BlogController(),
};

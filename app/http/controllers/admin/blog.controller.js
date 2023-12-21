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
        image,
        title,
        short_text,
        text,
        tags,
        category,
      });
      return res.json(201).json({
        data:{
            statusCode:201,
            meessage:'Blog has been created!'
        }
      });
    } catch (error) {
        deleteFileInPublic(req.body.image);
      next(error);
    }
  }
  async getListOfBlogs(req, res, next) {
    try {
      res.status(200).json({
        data: {
          statusCode: 200,
          blogs: [],
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

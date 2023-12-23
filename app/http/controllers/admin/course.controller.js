const createHttpError = require("http-errors");
const { CourseModel } = require("../../../models/course");
const { createCourseSchema } = require("../../validators/admin/course.schrma");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const path = require("path");
const { deleteFileInPublic } = require("../../../utils/functions");
class CourseController extends Controller {
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const { fileUploadPath, filename } = req.body;

      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { title, short_text, text, tags, category, price, discount } =
        req.body;
      const course = await CourseModel.create({
        teacher:req.user._id,
        title,
        short_text,
        text,
        tags,
        category,
        price,
        discount,
        image,
      });
      if(!course?._id) throw createHttpError.Unauthorized();

      res.status(HttpStatus.CREATED).json({
        data: {
          statusCode: HttpStatus.CREATED,
          message: "The course has been created!",
        },
      });
    } catch (err) {
        deleteFileInPublic(req.body.image);
      next(err);
    }
  }
  async getListOfCourses(req, res, next) {
    try {
      const { search } = req.query;
      const courses = null;
      if (search) {
        courses = await CourseModel.find({
          $text: {
            $search: search,
          },
        }).sort({ _id: -1 });
      } else {
        courses = await CourseModel.find({}).sort({ _id: -1 });
      }

      return res.status(HttpStatus.OK).json({
        data: {
          statusCode: HttpStatus.OK,
          courses,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async removeOneCourse(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
  async UpdateCourse(req, res, next) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

module.exports = {
  CourseController: new CourseController(),
};

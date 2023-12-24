const createHttpError = require("http-errors");

const { createCourseSchema } = require("../../../validators/admin/course.schrma");
const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const path = require("path");
const mongoose=require('mongoose');
const { deleteFileInPublic } = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const chapter = require("../../../../routes/admin/chapter");
const { CourseController } = require("./course.controller");
class ChapterController extends Controller {
  async addCourse(req, res, next) {
    try {
      await createCourseSchema.validateAsync(req.body);
      const { fileUploadPath, filename } = req.body;

      const image = path.join(fileUploadPath, filename).replace(/\\/g, "/");
      const { title, short_text, text, tags,type, category, price, discount } =
        req.body;
     if(Number(price) >0 && type =='free') throw createHttpError.BadRequest('برای دوره رایگان نمی توان قیمت تایین کرد')
      const course = await CourseModel.create({
        teacher:req.user._id,
        title,
        short_text,
        text,
        type,
        tags,
        category,
        price,
        discount,
        image,
      });
      if(!course?._id) throw createHttpError.InternalServerError();

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
      let courses;
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
  async getOneCourseById(req,res,next){
    try {
        const {id}=req.params;
        const course=await this.chaptersOfCourse(id);
        return res.status(HttpStatus.OK).json({
            data:{
                statusCode:HttpStatus.OK,
                course
            }
        })
        
    } catch (error) {
        next(error);
    }
  }
  async addChapter(req,res,next){
    try {
        const {id,title,text}=req.body;
        await CourseController.findCourseById(id);
        const savedChapterReqult=await CourseModel.updateOne({_id:id},{$push:{
            chapters:{
                title,
                text,
                episodes:[]
                
            }
        }});
        if(savedChapterReqult.modifiedCount==0) throw createHttpError.InternalServerError();

        return res.status(HttpStatus.CREATED).json({
            data:{
                statusCode:HttpStatus.CREATED,
                message:"the Chapter has been created!"
            }
        });
        
    } catch (error) {
        next(error);
    }
  }
  async chaptersOfCourse(req, res, next) {
    try {
      const {id}=req.params;
      const chapters=await this.GetChapterOfCourse(id);
      return res.status(HttpStatus.OK).json({
        data:{
          statusCode:HttpStatus.OK,
          chapters
        }
      })
    } catch (err) {
      next(err);
    }
  }
  async GetChapterOfCourse(id) {
    if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest('Id is not objectId!');
    const chapters=await CourseModel.findOne({_id:id},{chapters:1,title:1});
    

    if(!chapters) throw createHttpError.NotFound("The course not founded!");
    return chapter;
  }
}

module.exports = {
  ChapterController: new ChapterController(),
};
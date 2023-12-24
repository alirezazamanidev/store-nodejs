const createHttpError = require("http-errors");
const { getVideoDurationInSeconds } = require('get-video-duration')
const { createCourseSchema, createEpisodeSchema } = require("../../../validators/admin/course.schrma");
const Controller = require("../../controller");
const { StatusCodes: HttpStatus, RESET_CONTENT } = require("http-status-codes");
const path = require("path");
const mongoose=require('mongoose');
const { deleteFileInPublic, checkDataForUpdate, getTime } = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
const chapter = require("../../../../routes/admin/chapter");
const { CourseController } = require("./course.controller");
class EpisodeController extends Controller {
 async addEpisode(req,res,next){
  try {
  
    const {title,text,chapterId,courseId,filename,fileUploadPath}=await createEpisodeSchema.validateAsync(req.body);
    const videoAddress=path.join(fileUploadPath,filename).replace(/\\/g, "/");
    const videoUrl= `http://localhost:3000/ ${videoAddress}`;
    const secounds=await getVideoDurationInSeconds(videoUrl);
    const time=getTime(secounds);

     res.json({
      time,title,text,chapterId,courseId,filename,fileUploadPath
     })
  } catch (error) {
    next(error);
  }
 }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};

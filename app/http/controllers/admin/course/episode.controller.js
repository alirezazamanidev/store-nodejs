const createHttpError = require("http-errors");
const { getVideoDurationInSeconds } = require("get-video-duration");
const {
  createCourseSchema,
  createEpisodeSchema,
} = require("../../../validators/admin/course.schrma");
const Controller = require("../../controller");
const { StatusCodes: HttpStatus, RESET_CONTENT } = require("http-status-codes");
const path = require("path");
const mongoose = require("mongoose");
const {
  deleteFileInPublic,
  checkDataForUpdate,
  getTime,
} = require("../../../../utils/functions");
const { CourseModel } = require("../../../../models/course");
class EpisodeController extends Controller {
  async addEpisode(req, res, next) {
    try {
     
      const { title, text, chapterID, courseID, filename, fileUploadPath } =
        await createEpisodeSchema.validateAsync(req.body);
      const fileAddress = path.join(fileUploadPath, filename);
      const videoAddress = fileAddress.replace(/\\/g, "/");
      const seconds = await getVideoDurationInSeconds(req.file.path);
      const time=getTime(seconds);
      const createEpisodeResult=await CourseModel.updateOne({_id:courseID,"chapters._id":chapterID},{
        $push:{
          "chapters.$.episodes":{
            title,
             text,
             time,
             type:'unlock',
            videoUrl:videoAddress,

          }
        }
      })
      if(createEpisodeResult.matchedCount==0) new createHttpError.InternalServerError();
      res.status(HttpStatus.OK).json({
        data:{
          statusCode:HttpStatus.OK,
          message:'The episode has been created!'
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};

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
const { ObjectIdValidator } = require("../../../validators/public.validator");
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
      // deleteFileInPublic(videoAddress);
      next(error);
    }
  }
  async removeOneEpisode(req,res,next){
    try {
      const {id:episodeId}=await ObjectIdValidator.validateAsync({id:req.params.episodeId});

      const removeEpisodeResult=await CourseModel.updateOne({
        'chapters.episodes._id':episodeId

      },{
        $pull:{
          'chapters.$.episodes':{
            _id:episodeId
          }
        }
      });
      if(removeEpisodeResult.modifiedCount==0) throw createHttpError.InternalServerError();
      return res.status(HttpStatus.OK).json({
        data:{
          statuasCode:HttpStatus.OK,
          message:"The Episode has been removed!"
        }
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  EpisodeController: new EpisodeController(),
};

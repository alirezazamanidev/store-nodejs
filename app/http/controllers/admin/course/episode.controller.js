const createHttpError = require("http-errors");
const { getVideoDurationInSeconds } = require("get-video-duration");
const {
  createEpisodeSchema,
} = require("../../../validators/admin/course.schrma");
const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const path = require("path");

const {
  deleteFileInPublic,
  checkDataForUpdate,
  getTime,
  copyObject,
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
             videoAddress

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
  async updateEpisode(req, res, next) {
    try {
         const {episodeId} = req.params
        const episode = await this.getOneEpisode(episodeId);
        const { filename, fileUploadPath } = req.body
        let blackListFields = ["_id"]
        if(filename && fileUploadPath){
            const fileAddress = path.join(fileUploadPath, filename)
            req.body.videoAddress = fileAddress.replace(/\\/g, "/");
            
            const seconds = await getVideoDurationInSeconds(req.file.path);
            req.body.time = getTime(seconds);
            blackListFields.push("filename")
            blackListFields.push("fileUploadPath")
        }else{
            blackListFields.push("time")
            blackListFields.push("videoAddress")
        }
        const data = req.body;
        checkDataForUpdate(data, blackListFields)
        const newEpisode = {
            ...episode,
            ...data
        }
        const editEpisodeResult = await CourseModel.updateOne({
            "chapters.episodes._id": episodeId
        }, {
            $set: {
                "chapters.$.episodes": newEpisode
            }
        })
        if (!editEpisodeResult.modifiedCount)
            throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد")
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: {
                message: "ویرایش اپیزود با موفقیت انجام شد"
            }
        })
    } catch (error) {
        next(error)
    }
}
async getOneEpisode(episodeID){
    const course = await CourseModel.findOne({"chapters.episodes._id": episodeID})
    if(!course) throw new createHttpError.NotFound("اپیزودی یافت نشد")
    const episode = await course?.chapters?.[0]?.episodes?.[0]
    if(!episode) throw new createHttpError.NotFound("اپیزودی یافت نشد")
    return copyObject(episode)
}
}

module.exports = {
  EpisodeController: new EpisodeController(),
};

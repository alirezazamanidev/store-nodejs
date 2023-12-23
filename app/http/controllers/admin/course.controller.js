const { CourseModel } = require("../../../models/course");
const Controller = require("../controller");
const {StatusCodes:HttpStatus}=require('http-status-codes');
class CourseController extends Controller {
    
    async addCourse(req,res,next){
        try{
        }catch(err){
            next(err);
        }
    }
    async getListOfCourses(req,res,next){
        try{
            const {search}=req.query;
            const courses=null;
            if(search){
                courses=await CourseModel.find({
                    $text:{
                        $search:search
                    }
                }).sort({_id:-1});

            }else{

                courses=await CourseModel.find({}).sort({_id:-1});
            }

            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode:HttpStatus.OK,
                    courses
                }
            });
            
        }catch(err){
            next(err);
        }
    }
    async removeOneCourse(req,res,next){
        try{

        }catch(err){
            next(err);
        }
    }
    async UpdateCourse(req,res,next){
        try{

        }catch(err){
            next(err);
        }
    }

}

module.exports={
    CourseController:new CourseController()
}
const { UserModel } = require("../../../../models/users");
const { checkDataForUpdate } = require("../../../../utils/functions");
const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");

class UserController extends Controller {

    async getAllUser(req,res,next){
        try {
            const {search}=req.query;
        
            let databaseQuery={};
            if(search) databaseQuery["$text"]={$search:search};
            const users=await UserModel.find(databaseQuery);
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode:HttpStatus.OK,
                    users
                }
            })
            
        } catch (error) {
            next(error);
        }
    }

    async updateUserProfile(req, res, next){
        try {
            const userID = req.user._id;
            const data = req.body;
            const BlackListFields = ["mobile", "otp", "bills", "discount", "Roles", "Courses"]
            checkDataForUpdate(data, BlackListFields)
            const profileUpdateResult = await UserModel.updateOne({_id: userID}, { $set: data })
            if(!profileUpdateResult.modifiedCount) throw new createHttpError.InternalServerError("به روزسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روزرسانی پروفایل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports={
    UserController:new UserController()
}
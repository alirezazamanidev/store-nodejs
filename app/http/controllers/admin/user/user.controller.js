const { UserModel } = require("../../../../models/users");
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

}

module.exports={
    UserController:new UserController()
}
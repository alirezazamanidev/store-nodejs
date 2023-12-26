const createHttpError = require("http-errors");
const { ConverSationModel } = require("../../../models/conversation");
const Controller = require("../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
class NameSpaceController extends Controller {

    async addNameSpace(req,res,next){
        try{
            const {title,endpoint}=req.body;
            await this.findNameSpaceByEndpoint(endpoint);
            await ConverSationModel.create({title,endpoint});
            return res.status(HttpStatus.CREATED).json({
                data:{
                    statusCode:HttpStatus.CREATED,
                    message:'NameSpace has been  created!'
                }
            })

        }catch(err){
            next(err);
        }
    }
    async getListOfNameSpaces(req,res,next){
        try {
            const nameSpaces=await ConverSationModel.find({},{rooms:0})
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode:HttpStatus.OK,
                    nameSpaces
                }
            })
        } catch (error) {
            next(error);
        }
    }

    async findNameSpaceByEndpoint(endpoint){
     const conversation= await ConverSationModel.findOne({endpoint});
     if(conversation) throw createHttpError.BadRequest('The nameSpace has already exist!');

    }
}

module.exports={
    NameSpaceController:new NameSpaceController()
}
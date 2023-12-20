const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const { categorySchema } = require("../../validators/admin/category.schema");

class CategoryController extends Controller {
   async addCategory(req,res,next){
        try {
            await categorySchema.validateAsync(req.body);
            const {title,parent}=req.body;
            const newCategory=await CategoryModel.create({title,parent});
            if(!newCategory) throw createHttpError.InternalServerError('Category not saved!');
            return res.status(201).json({
                data:{
                    statusCode:201,
                    message:"category has been created!"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req,res,next){
        try {
            const parents=await CategoryModel.find({parent:undefined});
            return res.status(200).json({
                data:{
                    statusCode:200,
                    parents
                }
            })
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports={
    CategoryController:new CategoryController()
}
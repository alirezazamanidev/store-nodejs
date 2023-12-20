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
    async getChildParent(req,res,next){
        try {
            const {parent}=req.params;
            const childern=await CategoryModel.find({parent});
            return res.status(200).json({
                data:{
                    statusCode:200,
                    childern
                }
            })
            
        } catch (error) {
            next(err);
        }
    }
    async getAllCategory(req,res,next){
        try{
            const categories=await CategoryModel.aggregate([{
                $lookup:{
                    from:'categories',
                    localField:'_id',
                    foreignField:'parent',
                    as:'childern'
                    
                },
                
            },{
                $project:{
                    __v:0,
                    'childern.__v':0,
                    'childern.parent':0,
                }
            }
            
        
        ]);

            return res.status(200).json({
                data:{
                    satatusCode:200,
                    categories
                }
            })

        }catch(err){
            next(err); 
        }
    }
}

module.exports={
    CategoryController:new CategoryController()
}
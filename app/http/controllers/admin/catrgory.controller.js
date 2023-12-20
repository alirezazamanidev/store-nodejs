const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const { categorySchema, UpdateCategorySchema } = require("../../validators/admin/category.schema");
const mongoose = require("mongoose");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await categorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const newCategory = await CategoryModel.create({ title, parent });
      if (!newCategory)
        throw createHttpError.InternalServerError("Category not saved!");
      return res.status(201).json({
        data: {
          statusCode: 201,
          message: "category has been created!",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          statusCode: 200,
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getChildParent(req, res, next) {
    try {
      const { parent } = req.params;
      const childern = await CategoryModel.find({ parent });
      return res.status(200).json({
        data: {
          statusCode: 200,
          childern,
        },
      });
    } catch (error) {
      next(err);
    }
  }
  async getAllCategory(req, res, next) {
    try {
      const categories = await CategoryModel.find({parent:undefined},{__v:0});
      return res.status(200).json({
        data: {
          satatusCode: 200,
          categories,
        },
      });
    } catch (err) {
      next(err);
    }
  }
  async getCategorybyId(req, res, next) {
    try {
      const category = await CategoryModel.aggregate([
        {
            $match: {
              _id: mongoose.Types.ObjectId(req.params.id),
            },
          },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "childern",
          },
        },
        {
          $project: {
            __v: 0,
            "childern.__v": 0,
            "childern.parent": 0,
          },
        }
      
      ]);

      return res.status(200).json({
        data:{
            statusCode:200,
            category
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
    
      const deleteManyResult = await CategoryModel.deleteOne({ $or:[
        {_id: category.id},
        {parent:category.id}
      ]});
      if (deleteManyResult.deletedCount == 0)
        throw createHttpError.InternalServerError();
      return res.status(200).json({
        data: {
          statusCode: 200,
          message: "Category has been deleted!",
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async editCategory(req,res,next){
    try {
      const {id}=req.params;
      const {title}=req.body;

      await this.checkExistCategory(id);
      await UpdateCategorySchema.validateAsync(req.body);
      const resultUpdate=await CategoryModel.updateOne({_id:id},{$set:{title}});
      if(resultUpdate.modifiedCount==0) throw createHttpError.InternalServerError();
      return res.status(200).json({
        data:{
          status:200,
          message:'Category has been updated!'
        }
      })
      
    } catch (error) {
      next(error);
    }
  }

  async getAllCategoryWithoutPopulate(req,res,next){
    try {
      const categories=await CategoryModel.aggregate([{$match:{}}]);
      res.status(200).json({
        data:{
          statusCode:200,
          categories
        }
      })
    } catch (error) {
      next(error);
    }
  }

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createHttpError.NotFound("Category not found!");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};

const createHttpError = require("http-errors");
const { ProductModel } = require("../../../../models/products");
const { deleteFileInPublic ,setFeatures, ListOfImagesFromRequest, copyObject, checkDataForUpdate} = require("../../../../utils/functions");
const {
  createProductSchema,
} = require("../../../validators/admin/product.schrma");
const { ObjectIdValidator } = require("../../../validators/public.validator");
const Controller = require("../../controller");
const {StatusCodes}=require('http-status-codes');
const ProductBlackList = {
  BOOKMARKS: "bookmarks",
  LIKES: "likes",
  DISLIKES: "dislikes",
  COMMENTS: "comments",
  SUPPLIER: "supplier",
  WEIGHT: "weight",
  WIDTH: "width",
  LENGTH: "length",
  HEIGHT: "height",
  COLORS: "colors"
}
Object.freeze(ProductBlackList)
class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
    
      const images=ListOfImagesFromRequest(req.files || [],req.body.fileUploadPath);
      console.log(images);
      const productBody = await createProductSchema.validateAsync(req.body);
      const { title, text, short_text, category, tags, count, price,colors, discount, type } = productBody;
      const supplier = req.user._id;
      let features = setFeatures(req.body)
       await ProductModel.create({
        supllier:supplier,
        title,
        text,
        short_text,
        category,
        tags,
        count,
        price,
        discount,
        images,
        features,
        supplier,
       
        type
      })
      return res.status(StatusCodes.CREATED).json({
        statusCode: StatusCodes.CREATED,
        data: {
          message: "The product has been created!"
        }
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);

      next(error);
    }
  }
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await this.findProductById(id);
      const data=copyObject(req.body);
      data.images=ListOfImagesFromRequest(req.files,req.body.fileUploadPath);
      data.features=setFeatures(req.body);  
      let blackListFields = Object.values(ProductBlackList);
      checkDataForUpdate(data, blackListFields)
      const updateProductResult = await ProductModel.updateOne({ _id: product._id }, { $set: data })
      if (updateProductResult.modifiedCount == 0) throw { status: StatusCodes.INTERNAL_SERVER_ERROR, message: "خطای داخلی" }
      return res.status(StatusCodes.OK).json({
        data : {
          statusCode: StatusCodes.OK,
          message: "The product has been updated!"
        }
      })
    } catch (error) {
      deleteFileInPublic(req.body.image)
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const search=req?.query?.search || "";
      let products=[];
      if(search){
        products=await ProductModel.find({
          $text:{
            $search:new RegExp(search,'gi')
          }
        });
      }else {
        products=await ProductModel.find({});
      } 
      return res.status(StatusCodes.OK).json({
        data:{
          statusCode:StatusCodes.OK,
          products
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
      const {id}=req.params;
      const product=await this.findProductById(id);
      return res.status(StatusCodes.OK).json({
        data:{
          statusCode:StatusCodes.OK,
          product
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async removeProductById(req,res,next){
    try {
      const {id}=req.params;
      const product=await this.findProductById(id);
      const recmoveProductResult=await ProductModel.deleteOne({_id:product._id});
      if(recmoveProductResult.deletedCount==0) throw createHttpError.InternalServerError(); 
      return res.status(StatusCodes.OK).json({
        data:{
          statusCode:StatusCodes.OK,
          message:'The product has been removed!',
        }
      })
      
    } catch (error) {
      next(error);
    }
  }

  async findProductById(productId){
    const {id}=await ObjectIdValidator.validateAsync({id:productId});
    const product=await ProductModel.findById(id);
    if(!product)throw createHttpError.NotFound('The  product is not found!');
    return product;

  }
}

module.exports = {
  ProductController: new ProductController(),
};

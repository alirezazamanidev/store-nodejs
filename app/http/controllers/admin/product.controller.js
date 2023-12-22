const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic ,setFeatures, ListOfImagesFromRequest} = require("../../../utils/functions");
const {
  createProductSchema,
} = require("../../validators/admin/product.schrma");
const Controller = require("../controller");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
    
      const images=ListOfImagesFromRequest(req.files || [],req.body.fileUploadPath);

      const productBody = await createProductSchema.validateAsync(req.body);
      const { title, text, short_text, category, tags, count, price, discount, type } = productBody;
      const supplier = req.user._id;
      let features = setFeatures(req.body)
       await ProductModel.create({
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
      return res.status(201).json({
        statusCode: 201,
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
    } catch (error) {
      next(error);
    }
  }
  async removeProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async getAllProduct(req, res, next) {
    try {

      const products=await ProductModel.find({});
      return res.status(200).json({
        data:{
          statusCode:200,
          products
        }
      })
    } catch (error) {
      next(error);
    }
  }
  async getOneProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ProductController: new ProductController(),
};

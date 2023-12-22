const { ProductModel } = require("../../../models/products");
const { deleteFileInPublic ,setFeatures} = require("../../../utils/functions");
const path=require('path');
const {
  createProductSchema,
} = require("../../validators/admin/product.schrma");
const Controller = require("../controller");

class ProductController extends Controller {
  async addProduct(req, res, next) {
    try {
      const productBody = await createProductSchema.validateAsync(req.body);
      req.body.image = path.join(
        productBody.fileUploadPath,
        productBody.filename
      );
      req.body.image = req.body.image.replace(/\\/gi, "/");
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
        image:req.body.image,
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

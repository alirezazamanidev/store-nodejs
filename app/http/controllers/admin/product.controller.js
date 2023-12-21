const Controller = require("../controller");

class ProductController extends Controller {

    async addProduct(req,res,next){
      try {
        
      } catch (error) {
        next(error);
      }
    }
    async updateProduct(req,res,next){
        try {
          
        } catch (error) {
          next(error);
        }
      }
      async  removeProduct(req,res,next){
        try {
          
        } catch (error) {
          next(error);
        }
      }
      async getAllProduct(req,res,next){
        try {
          
        } catch (error) {
          next(error);
        }
      }
      async getOneProduct(req,res,next){
        try {
          
        } catch (error) {
          next(error);
        }
      }
    
}

module.exports={
    ProductController:new ProductController()
}
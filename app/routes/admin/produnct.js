const {ProductController} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post('/add',UploadFile.array('images',10),stringToArray('tags'),ProductController.addProduct);
router.get('/list',ProductController.getAllProducts);
router.get('/:id',ProductController.getOneProduct);
module.exports={
    AdminApiProductRoutes :router
}
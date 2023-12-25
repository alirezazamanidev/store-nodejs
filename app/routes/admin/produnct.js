const {ProductController} = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post('/add',UploadFile.array('images',10),stringToArray('tags','colors'),ProductController.addProduct);
router.get('/list',ProductController.getAllProducts);
router.get('/:id',ProductController.getOneProduct);
router.delete('/remove/:id',ProductController.removeProductById);
router.patch('/edit/:id',UploadFile.array('images',10),stringToArray('tags'),ProductController.updateProduct);
module.exports={
    AdminApiProductRoutes :router
}
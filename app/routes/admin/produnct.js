const {ProductController} = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.post('/add',UploadFile.single('image'),stringToArray('tags'),ProductController.addProduct);
module.exports={
    AdminApiProductRoutes :router
}
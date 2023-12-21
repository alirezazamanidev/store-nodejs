const {ProductController} = require("../../http/controllers/admin/product.controller");

const router = require("express").Router();

router.post('/add',ProductController.addProduct);
module.exports={
    AdminApiProductRoutes :router
}
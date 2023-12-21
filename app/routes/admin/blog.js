const { BlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.get('/',BlogController.getListOfBlogs);
router.post('/add',UploadFile.single('image'),stringToArray('tags'),BlogController.createBlog);
router.get('/:id',BlogController.getOneBlogById);
router.delete('/:id',BlogController.removeBlog);
router.patch('/update/:id',UploadFile.single('image'),stringToArray('tags'),BlogController.updateBlog);
module.exports={
    BlogRoutes:router
}
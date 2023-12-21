const { BlogController } = require("../../http/controllers/admin/blog.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/blogs/:
 *  get:
 *   tags: [Blog(AdminPanel)]
 *   summary: get All blogs
 *   responses:
 *       200:
 *         description: success
 * 
 */

router.get('/',BlogController.getListOfBlogs);
module.exports={
    BlogRoutes:router
}
const { CategoryController } = require("../../http/controllers/admin/catrgory.controller");

const router = require("express").Router();


/**
 * @swagger
 * tags:
 *  name: Admin-Panel
 */
/**
 * @swagger
 * /admin/category/create:
 *  post:
 *   tags: [Admin-Panel]
 *   summary: Add category
 *   parameters:
 *      -  in: formData
 *         type: string
 *         name: title
 *         required: true
 *      -  in: formData
 *         type: string
 *         name: parent
 *   responses:
 *       201:
 *         description: success
 *      
 *         
 * 
 */

router.post('/create',CategoryController.addCategory);
module.exports = {
  CategoryRouter: router,
};

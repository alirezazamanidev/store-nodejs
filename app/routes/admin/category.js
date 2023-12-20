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
/**
 * @swagger
 * /admin/category/parents:
 *  get:
 *    tags: [Admin-Panel]
 *    summary: Get All parents of category  or category head
 *    responses:
 *        200:
 *           description: sucucess
 */

router.get('/parents',CategoryController.getAllParents);
module.exports = {
  CategoryRouter: router,
};

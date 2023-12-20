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
/**
 * @swagger
 * /admin/category/childern/{parent}:
 *  get:
 *    tags: [Admin-Panel]
 *    summary: Get All childern of category  or category head
 *    parameters:
 *        -  in: path
 *           name: parent
 *           type: string
 *           required: true
 *    responses:
 *        200:
 *           description: sucucess
 */

router.get('/childern/:parent',CategoryController.getChildParent);
/**
 * @swagger
 * /admin/category/all:
 *  get:
 *    tags: [Admin-Panel]
 *    summary: Get All Categories
 *    responses:
 *        200:
 *           description: sucucess
 */

router.get('/all',CategoryController.getAllCategory);
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *    tags: [Admin-Panel]
 *    summary: Delete one category with id of params
 *    parameters:
 *        -  in: path
 *           name: id
 *           type: string
 *           required: true
 *    responses:
 *        200:
 *           description: sucucess
 */

router.delete('/remove/:id',CategoryController.removeCategory);

module.exports = {
  CategoryRouter: router,
};

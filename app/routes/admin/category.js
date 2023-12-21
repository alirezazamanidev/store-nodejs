const { CategoryController } = require("../../http/controllers/admin/catrgory.controller");

const router = require("express").Router();

/**
 * @swagger
 * /admin/category/create:
 *  post:
 *   tags: [Category(AdminPanel)]
 *   summary: Add category
 *   parameters:
 *      -  in: header
 *         example: Bearer Token...
 *         name: access_token
 *         type: string
 *         required: true
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
 * 
 *    tags: [Category(AdminPanel)]
 *    summary: Get All parents of category  or category head
 *    parameters:
 *       -  in: header
 *          example: Bearer Token...
 *          name: access_token
 *          type: string
 *          required: true
 *    responses:
 *        200:
 *           description: sucucess
 */

router.get('/parents',CategoryController.getAllParents);
/**
 * @swagger
 * /admin/category/childern/{parent}:
 *  get:
 *    tags: [Category(AdminPanel)]
 *    summary: Get All childern of category  or category head
 *    parameters:
 *        -  in: header
 *           example: Bearer Token...
 *           name: access_token
 *           type: string
 *           required: true
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
 *    tags: [Category(AdminPanel)]
 *    summary: Get All Categories
 *    parameters:
 *       -  in: header
 *          example: Bearer Token...
 *          name: access_token
 *          type: string
 *          required: true
 *    responses:
 *        200:
 *           description: sucucess
 */

router.get('/all',CategoryController.getAllCategory);
/**
 * @swagger
 * /admin/category/list-of-all:
 *  get:
 *    tags: [Category(AdminPanel)]
 *    summary: Get All Categories without populate
 *    parameters:
 *        -  in: header
 *           example: Bearer Token...
 *           name: access_token
 *           type: string
 *           required: true
 *    responses:
 *        200:
 *           description: sucucess
 */

router.get('/list-of-all',CategoryController.getAllCategoryWithoutPopulate);
/**
 * @swagger
 * /admin/category/{id}:
 *  get:
 *    tags: [Category(AdminPanel)]
 *    summary: Get one category with id of params
 *    parameters:
 *        -  in: header
 *           example: Bearer Token...
 *           name: access_token
 *           type: string
 *           required: true
 *        -  in: path
 *           name: id
 *           type: string
 *           required: true
 *    responses:
 *        200:
 *           description: sucucess
 */
router.get('/:id',CategoryController.getCategorybyId);
/**
 * @swagger
 * /admin/category/update/{id}:
 *  patch:
 *    tags: [Category(AdminPanel)]
 *    summary: update one category with id of params
 *    parameters:
 *        -  in: header
 *           example: Bearer Token...
 *           name: access_token
 *           type: string
 *           required: true
 *        -  in: path
 *           name: id
 *           type: string
 *           required: true
 *        -  in: formData
 *           name: title
 *           type: string
 *           required: true
 *    responses:
 *        200:
 *           description: sucucess
 */
router.patch('/update/:id',CategoryController.editCategory);
/**
 * @swagger
 * /admin/category/remove/{id}:
 *  delete:
 *    tags: [Category(AdminPanel)]
 *    summary: Delete one category with id of params
 *    parameters:
 *        -  in: header
 *           example: Bearer Token...
 *           name: access_token
 *           type: string
 *           required: true
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

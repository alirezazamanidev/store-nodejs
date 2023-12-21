const { BlogController } = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();

/**
 * @swagger
 * /admin/blogs/:
 *  get:
 *   tags: [Blog(AdminPanel)]
 *   summary: get All blogs
 *   parameters:
 *       -  in: header
 *          example: Bearer Token...
 *          name: access_token
 *          type: string
 *          required: true
 *   responses:
 *       200:
 *         description: success
 * 
 */

router.get('/',BlogController.getListOfBlogs);
/**
 * @swagger
 * /admin/blogs/add:
 *  post:
 *   tags: [Blog(AdminPanel)]
 *   summary: create one  blog
 *   consumes:
 *     -  multipart/form-data
 *    
 *            
 *   parameters:
 *       -  in: header
 *          example: Bearer Token...
 *          name: access_token
 *          type: string
 *          required: true
 *       -  in: formData
 *          name: title
 *          type: string
 *          required: true
 *       -  in: formData
 *          name: short_text
 *          type: string
 *          required: true
 *       -  in: formData
 *          name: text
 *          type: string
 *          required: true
 *       -  in: formData
 *          name: tags
 *          example: tag1#tag2#tag3#foo_bar#fo_bar2 || str || undifind
 *          type: string
 *       -  in: formData
 *          name: category
 *          type: string
 *          required: true
 *       -  in: formData
 *          name: image
 *          type: file
 *          required: true
 *          
 *          
 *          
 *   responses:
 *       201:
 *         description: success
 *       401:
 *         description: Unautorized!
 * 
 */
router.post('/add',UploadFile.single('image'),stringToArray('tags'),BlogController.createBlog);

/**
 * @swagger
 * /admin/blogs/{id}:
 *  get:
 *   tags: [Blog(AdminPanel)]
 *   summary: get one blog byc id
 *   parameters:
 *       -  in: header
 *          example: Bearer Token...
 *          name: access_token
 *          type: string
 *          required: true
 *       -  in: path
 *          name: id
 *          type: string
 *          required: true
 *   responses:
 *       200:
 *         description: success
 * 
 */

router.get('/:id',BlogController.getOneBlogById);
/**
 * @swagger
 * /admin/blogs/{id}:
 *  delete:
 *   tags: [Blog(AdminPanel)]
 *   summary: delete one blog byc id
 *   parameters:
 *       -  in: header
 *          example: Bearer Token...
 *          name: access_token
 *          type: string
 *          required: true
 *       -  in: path
 *          name: id
 *          type: string
 *          required: true
 *   responses:
 *       200:
 *         description: success
 * 
 */
router.delete('/:id',BlogController.removeBlog);

module.exports={
    BlogRoutes:router
}
const { VerifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
const { BlogRoutes } = require('./blog')
const { CategoryRouter } = require('./category')


const router=require('express').Router()


/**
 * @swagger
 * tags:
 *  - name: Admin-Panel
 *    description: all routes and action (add,create,edit,...)
 *  - name: Category(AdminPanel)
 *    description: all  methods and routes about category
 *  - name: Blog(AdminPanel)
 *    description: all  methods and routes about Blog
 */

router.use('/category',CategoryRouter)
router.use('/blogs',BlogRoutes);
module.exports={
    AdminRoutes:router
}
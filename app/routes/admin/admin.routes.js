const { CategoryRouter } = require('./category')


const router=require('express').Router()


/**
 * @swagger
 * tags:
 *  - name: Admin-Panel
 *    description: all routes and action (add,create,edit,...)
 *  - name: Category(AdminPanel)
 *    description: all  methods and routes about category
 */

router.use('/category',CategoryRouter)
module.exports={
    AdminRoutes:router
}
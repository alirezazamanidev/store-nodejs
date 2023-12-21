const { VerifyAccessToken } = require('../../http/middlewares/verifyAccessToken');
const { BlogRoutes } = require('./blog')
const { CategoryRouter } = require('./category')


const router=require('express').Router()


router.use('/category',CategoryRouter)
router.use('/blogs',BlogRoutes);
module.exports={
    AdminRoutes:router
}
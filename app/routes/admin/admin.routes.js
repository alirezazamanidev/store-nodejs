const { AdminApiBlogRoutes } = require('./blog')
const { AdminApiCategoryRouter } = require('./category');
const { AdminApiProductRoutes } = require('./produnct');


const router=require('express').Router()


router.use('/category',AdminApiCategoryRouter)
router.use('/blogs',AdminApiBlogRoutes);
router.use('/products',AdminApiProductRoutes)
module.exports={
    AdminRoutes:router
}
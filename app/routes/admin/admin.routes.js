const { AdminApiBlogRoutes } = require('./blog')
const { AdminApiCategoryRouter } = require('./category');
const { AdminApiChapterRoutes } = require('./chapter');
const { AdminApiCourseRoutes } = require('./course');
const { AdminApiProductRoutes } = require('./produnct');


const router=require('express').Router()


router.use('/category',AdminApiCategoryRouter)
router.use('/blogs',AdminApiBlogRoutes);
router.use('/products',AdminApiProductRoutes)
router.use('/courses',AdminApiCourseRoutes);
router.use('/chapters',AdminApiChapterRoutes);
module.exports={
    AdminRoutes:router
}
const { CourseController } = require('../../http/controllers/admin/course.controller')

const router=require('express').Router()


router.get('/list',CourseController.getListOfCourses)  // get all courses

module.exports={
    AdminApiCourseRoutes:router
}
const { CourseController } = require('../../http/controllers/admin/course.controller')
const { stringToArray } = require('../../http/middlewares/stringToArray')
const { UploadFile } = require('../../utils/multer')

const router=require('express').Router()


router.get('/list',CourseController.getListOfCourses)  // get all courses
router.post('/add',UploadFile.single('image'),stringToArray('tags'),CourseController.addCourse) // add one course
module.exports={
    AdminApiCourseRoutes:router
}
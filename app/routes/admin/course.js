const { CourseController } = require('../../http/controllers/admin/course/course.controller')
const { stringToArray } = require('../../http/middlewares/stringToArray')
const { UploadFile } = require('../../utils/multer')

const router=require('express').Router()


router.get('/list',CourseController.getListOfCourses)  // get all courses
router.post('/add',UploadFile.single('image'),stringToArray('tags'),CourseController.addCourse) // add one course
router.get('/:id',CourseController.getOneCourseById) // get one course by id
router.patch('/update/:id',UploadFile.single('image'),stringToArray('tags'),CourseController.updateCourseById)
module.exports={
    AdminApiCourseRoutes :router
}
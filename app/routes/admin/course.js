const { CourseController } = require('../../http/controllers/admin/course/course.controller')
const { stringToArray } = require('../../http/middlewares/stringToArray')
const { UploadFile } = require('../../utils/multer')

const router=require('express').Router()


router.get('/list',CourseController.getListOfCourses)  // get all courses
router.post('/add',UploadFile.single('image'),stringToArray('tags'),CourseController.addCourse) // add one course
router.get('/:id',CourseController.getOneCourseById) // get one course by id
router.put('/add-chapter',CourseController.addChapter); // add chapter
module.exports={
    AdminApiCourseRoutes:router
}
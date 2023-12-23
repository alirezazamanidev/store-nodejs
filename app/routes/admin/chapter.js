const { ChapterController } = require('../../http/controllers/admin/course/chapter.controller');
const { CourseController } = require('../../http/controllers/admin/course/course.controller')
const { stringToArray } = require('../../http/middlewares/stringToArray')
const { UploadFile } = require('../../utils/multer')

const router=require('express').Router()

router.put('/add',ChapterController.addChapter); // add chapter


module.exports={
    AdminApiChapterRoutes:router
}
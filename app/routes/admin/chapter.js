const { ChapterController } = require('../../http/controllers/admin/course/chapter.controller');
const router=require('express').Router()

router.put('/add',ChapterController.addChapter); // add chapter
router.get('/list/:id',ChapterController.chaptersOfCourse);

module.exports={
    AdminApiChapterRoutes:router
}
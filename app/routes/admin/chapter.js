const { ChapterController } = require('../../http/controllers/admin/course/chapter.controller');
const router=require('express').Router()

router.put('/add',ChapterController.addChapter); // add chapter
router.get('/list/:id',ChapterController.chaptersOfCourse);
router.patch('/remove/:chapterId',ChapterController.removeChapterById);
router.patch('/update/:chapterId',ChapterController.updateOneChapter);
module.exports={
    AdminApiChapterRoutes:router
}
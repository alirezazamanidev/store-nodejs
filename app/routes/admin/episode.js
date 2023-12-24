
const { EpisodeController } = require('../../http/controllers/admin/course/episode.controller');
const {UploadVideo  } = require('../../utils/multer');
const router=require('express').Router()

router.post('/add',UploadVideo.single('video'),EpisodeController.addEpisode);
module.exports={
    AdminApiEpisodeRoutes:router
}
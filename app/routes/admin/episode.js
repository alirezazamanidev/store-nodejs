
const { EpisodeController } = require('../../http/controllers/admin/course/episode.controller');
const {UploadVideo  } = require('../../utils/multer');
const router=require('express').Router()

router.post('/add',UploadVideo.single('video'),EpisodeController.addEpisode);
router.delete('/remove/:episodeId',EpisodeController.removeOneEpisode);
router.patch('/update/:episodeId',UploadVideo.single('video'),EpisodeController.updateEpisode)
module.exports={
    AdminApiEpisodeRoutes:router
}
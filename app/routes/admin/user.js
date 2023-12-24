const { UserController } = require('../../http/controllers/admin/user/user.controller')


const router=require('express').Router()

router.get('/list',UserController.getAllUser);
router.patch('/update-profile',UserController.updateUserProfile);
module.exports={
    AdminApiUserRoutes:router
}
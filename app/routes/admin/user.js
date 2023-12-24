const { UserController } = require('../../http/controllers/admin/user/user.controller')


const router=require('express').Router()

router.get('/list',UserController.getAllUser);
module.exports={
    AdminApiUserRoutes:router
}
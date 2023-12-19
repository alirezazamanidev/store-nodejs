const { UserAuthController } = require('../../http/controllers/user/auth/auth.controller');

const router=require('express').Router();

router.post('/auth/login',UserAuthController )
module.exports={
    UserAuthRoutes:router
}
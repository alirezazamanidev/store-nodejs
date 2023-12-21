

const { VerifyAccessToken } = require('../http/middlewares/verifyAccessToken');
const {AdminRoutes} = require('./admin/admin.routes');
const {DeveloperRouter} = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');
const {chekRole} =require('../http/middlewares/verifyAccessToken');
const router=require('express').Router()

router.use('/user',UserAuthRoutes);
router.use('/developer',DeveloperRouter);
router.use('/admin',VerifyAccessToken,chekRole('ADMIN'),AdminRoutes);



module.exports={
    AllRoutes:router
}
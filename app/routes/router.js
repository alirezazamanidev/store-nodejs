
const {AdminRoutes} = require('./admin/admin.routes');
const {DeveloperRouter} = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

const router=require('express').Router()

router.use('/user',UserAuthRoutes);
router.use('/developer',DeveloperRouter);
router.use('/admin',AdminRoutes);



module.exports={
    AllRoutes:router
}
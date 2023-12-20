
const {DeveloperRouter} = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

const router=require('express').Router()

router.use('/user',UserAuthRoutes);
router.use('/developer',DeveloperRouter);



module.exports={
    AllRoutes:router
}
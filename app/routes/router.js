const { UserAuthRoutes } = require('./user/auth');

const router=require('express').Router();

router.use('/user',UserAuthRoutes);
module.exports={
    AllRoutes:router
}
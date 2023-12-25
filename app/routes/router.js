
const { VerifyAccessToken } = require('../http/middlewares/verifyAccessToken');
const {AdminRoutes} = require('./admin/admin.routes');
const {DeveloperRouter} = require('./developer.routes');
const { UserAuthRoutes } = require('./user/auth');

const { graphqlConfig } = require('../utils/graphql.config');
const { graphqlHTTP } = require('express-graphql');
const router=require('express').Router()

router.use('/user',UserAuthRoutes);
router.use('/developer',DeveloperRouter);
router.use('/admin',VerifyAccessToken,AdminRoutes);
router.use('/graphql',graphqlHTTP(graphqlConfig));


module.exports={
    AllRoutes:router
}
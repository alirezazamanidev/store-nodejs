const { ApiPaymentRoute } = require('./payment');

const router=require('express').Router();
router.use(ApiPaymentRoute);
module.exports={
    HomeRoutes:router
}
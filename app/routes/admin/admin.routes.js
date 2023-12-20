const { CategoryRouter } = require('./category')


const router=require('express').Router()


router.use('/category',CategoryRouter)
module.exports={
    AdminRoutes:router
}
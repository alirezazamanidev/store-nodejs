const router=require('express').Router();
const bcrypt=require('bcrypt');
const { RandomNumberGenerator } = require('../utils/functions');

/**
 * @swagger
 * tags:
 *   name: Developer
 *   description: developer utils
 */

/**
 * @swagger
 * /developer/hash-password:password:
 *  get:
 *   tags: [Developer]
 *   summary: Create hash password
 *   parameters:
 *       -  in: path
 *          type: string
 *          name: password
 *          required: true
 *   responses:
 *          200:
 *             description: success
 */


router.get('/hash-password:password',(req,res,next)=>{
 const salt=bcrypt.genSaltSync(15);

 const hashpassword=bcrypt.hashSync(req.params.password,salt);

 res.json({
    hashpassword
 })
})

/**
 * @swagger
 * /developer/random-number:
 *  get:
 *   tags: [Developer]
 *   summary: Create random number
 *   
 *   responses:
 *          200:
 *             description: success
 */


router.get('/random-number',(req,res,next)=>{
    
    res.json({
       randomNumber:RandomNumberGenerator().toString()
    })
   })
module.exports={
    DeveloperRouter:router
}
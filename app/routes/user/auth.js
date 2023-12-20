const  UserAuthController = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * tags:
 *  name: Auth
 */
/**
/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [Auth]
 *          summary: Login with OTP
 *          description: login user with one time password(otp)
 *          parameters:
 *              
 *              -   in: formData
 *                  type: string
 *                  name: phone
 *                  required : true
 *          responses:
 *              201: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.post("/login", UserAuthController.login);
module.exports = {
  UserAuthRoutes: router,
};

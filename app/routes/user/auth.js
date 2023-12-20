const authController = require("../../http/controllers/user/auth/auth.controller");
const  UserAuthController = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * tags:
 *  name: Auth
 */
/**
/**
 * @swagger
 *  /user/get-otp:
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
router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [Auth]
 *          summary: check otp with OTP
 *          description: check otp user with one time password(otp)
 *          parameters:
 *              -   in: formData
 *                  type: string
 *                  name: phone
 *                  required : true
 *              -   in: formData
 *                  type: string
 *                  name: code
 *                  required : true
 *          responses:
 *              200: 
 *                  description: Success
 *              400: 
 *                  description: Bad Request
 *              401: 
 *                  description: Unauthorization
 *              500: 
 *                  description: Internal Server Error 
 */
router.post("/check-otp", UserAuthController.checkOtp);
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [Auth]
 *          summary: create refresh token
 *          description: send refresh token for new access token
 *          parameters:
 *              -   in: body
 *                  type: string
 *                  name: refreshToken
 *                  required : true
 *           
 *          responses:
 *              200: 
 *                  description: Success
 *            
 */
router.post('/refresh-token',authController.refreshToken)
module.exports = {
  UserAuthRoutes: router,
};

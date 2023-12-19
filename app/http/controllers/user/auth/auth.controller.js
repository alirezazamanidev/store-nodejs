const authSchema = require("../../../validators/user/auth.schema");
const createErrors=require('http-errors');
  class UserAuthController {

    async login(req,res,next){
        try {
            const result=await authSchema.validateAsync(req.body);
            res.status(200).send('login');
            
        } catch (error) {
            next(createErrors.BadRequest(error.message));
        }
    }
 }
module.exports={
    UserAuthController
}
const createHttpError = require("http-errors");
const Controller = require("../controller");
const {UserModel}=require('./../../../models/users');
const { SignAccessToken } = require("../../../utils/functions");
class SupportController extends Controller {

    renderChatRoom(req,res,next){
        try {
            return res.render('chat.ejs');
        } catch (error) {
            next(error)
        }
    }
    loginForm(req,res,next){
        try {
            res.render('login.ejs',{
                error:undefined
            });
        } catch (error) {
            next(error);
        }
    }
    async login(req,res,next){
        try {
           const {phone}=req.body;
           const user=await UserModel.findOne({phone});
           if(!user) return res.render('login.ejs',{error:"کاربری یافت نشد"});
           const token=await SignAccessToken(user._id);
           user.token=token;
           await user.save();
           res.cookie('authorization',token,{
            httpOnly:true,
            expires:new Date(Date.now()  +1000*60*60*1 )
           });
           return res.redirect('/support');
        } catch (error) {
            next(error);
        }
    }
}

module.exports={
    SupportController:new SupportController()
}
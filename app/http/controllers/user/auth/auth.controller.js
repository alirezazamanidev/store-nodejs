const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const { RandomNumberGenerator, SignAccessToken, VerifyRefreshToken, SignRefreshToken } = require("../../../../utils/functions");
const {getOtpSchema,checkOtpSchema}=require('./../../../validators/user/auth.schema');
const { UserModel } = require("./../../../../models/users");
const createErrors = require("http-errors");
const Controller=require('./../../controller');
class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const { phone } = req.body;
      const code = RandomNumberGenerator();
      const result=await this.saveUser(phone,code);
      if(! result) throw createErrors.Unauthorized('login Error!!')
      res.status(200).json({
    data:{
        statusCode:200,
        message:"کد یک بار مصرف برای شما ارسال شد!",
        code,
        phone
    }
    });
    } catch (error) {
      next(error);
    }
  }
  async checkOtp(req,res,next){
    try{
        await checkOtpSchema.validateAsync(req.body);
        const {phone,code}=req.body;
        const user=await UserModel.findOne({phone});
        if(!user) throw createErrors.NotFound('کاربری یافت نشد!')
        if(user.otp.code!=code) throw createErrors.Unauthorized('کد ارسال شده  صحیح نمی باشد');
        const now= Date.now();
        if(+user.otp.expiresIn < now) throw createErrors.Unauthorized('کد ارسال شده منقضی شده است!');
        const accessToken=await SignAccessToken(user._id); 
        const refreshToken=await SignRefreshToken(user.id);

        return res.json({
            data:{
                accessToken,
                refreshToken
            }

        })

    }catch(err){
        next(err);
    }
  }
  async saveUser(phone,code) {
    const result = await this.checkExistUser(phone);
    let  otp={
        code,
        expiresIn:EXPIRES_IN,
        
    }
    if (result) {
       return await  this.UpdateUser(phone,{otp})
    }

    return await (UserModel.create({
        phone,
        otp,
        Roles:[USER_ROLE]
    }))
  }

  async refreshToken(req,res,next){
    try {
        const {refreshToken}=req.body;
        const phone=await VerifyRefreshToken(refreshToken);
        const user=await UserModel.findOne({phone});
        const accessToken=await SignAccessToken(user?.id);
        const newRefreshToken=await SignRefreshToken(user.id);
        return res.json({
            data:{
                accessToken,
                newRefreshToken
            }
        })
        
    } catch (error) {
        next(error)
    }
  }
  async checkExistUser(phone) {
    const user = await UserModel.findOne({ phone });
    return !!user;
  }
  async UpdateUser(phone, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { phone },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = new UserAuthController();

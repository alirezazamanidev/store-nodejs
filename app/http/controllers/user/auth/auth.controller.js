const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const { RandomNumberGenerator } = require("../../../../utils/functions");
const authSchema = require("../../../validators/user/auth.schema");
const { UserModel } = require("./../../../../models/users");
const createErrors = require("http-errors");
const Controller=require('./../../controller');
class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
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
      next(createErrors.BadRequest(error.message));
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
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}
module.exports = new UserAuthController();

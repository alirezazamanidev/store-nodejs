const JWT=require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET_KEY } = require('../../utils/constans');
const createHttpError = require('http-errors');
const { UserModel } = require('../../models/users');
function VerifyAccessToken(req,res,next){
    const headers=req.headers;
    const [berear,token]=headers?.accessToken?.split(' ')
    if(token && berear.toLowerCase()==='bearer') {
        JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async(err,payload)=>{
            if(err) return next(createHttpError.Unauthorized('Unauthorized'));
            const {phone}=payload;
            const user=await UserModel.findOne({phone},{password:0,otp:0});
            if(!user) throw createHttpError('حساب کاربری شما یافت نشد!');
            req.user=user;
            return next();
        })
    }
    return next(createHttpError.Unauthorized('Unauthorized'));
}
module.exports={
    VerifyAccessToken
}
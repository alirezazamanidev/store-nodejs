const createHttpError = require('http-errors');
const jwt=require('jsonwebtoken');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constans');
function RandomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

 function SignAccessToken(userId){

    return new Promise(async(resolve,reject)=>{
        const user=await UserModel.findById(userId);
        const payload={
            phone:user.phone,
            userId:user.id
        }


        const options={
            expiresIn:'1h'
        }
        jwt.sign(payload,ACCESS_TOKEN_SECRET_KEY,options,(err,token)=>{
            if(err) reject(createHttpError.InternalServerError('خطای سرور'))
            resolve(token);
        });
    })
}


function SignRefreshToken(userId){

    return new Promise(async(resolve,reject)=>{
        const user=await UserModel.findById(userId);
        const payload={
            phone:user.phone,
            userId:user.id
        }


        const options={
            expiresIn:'1y'
        }
        jwt.sign(payload,REFRESH_TOKEN_SECRET_KEY,options,(err,token)=>{
            if(err) reject(createHttpError.InternalServerError('خطای سرور'))
            resolve(token);
        });
    })
}

function VerifyRefreshToken(token){

    return new Promise((resolve,reject)=>{
        jwt.verify(token,REFRESH_TOKEN_SECRET_KEY,async(err,payload)=>{
            if(err) reject(createHttpError.Unauthorized('Unauthorized'));
            const {phone}=payload || {};
            const user=await UserModel.findOne({phone},{password:0,otp:0});
            if(!user) reject(createHttpError('حساب کاربری شما یافت نشد!'));
            resolve(phone);
        })
    })

}
module.exports={
    RandomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken
}
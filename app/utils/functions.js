const createHttpError = require('http-errors');
const jwt=require('jsonwebtoken');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constans');
const fs=require('fs');
const path=require('path');
const redisClient = require('./init_redis');
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
        jwt.sign(payload,REFRESH_TOKEN_SECRET_KEY,options,async(err,token)=>{
            if(err) reject(createHttpError.InternalServerError('خطای سرور'))
            await redisClient.SETEX(userId,(360*60*60*12),token)
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
            const refreshToken=await redisClient.get(user.id || 'key_defualt');
            if(!refreshToken) reject(createHttpError.Unauthorized('ورود انجام نشد'))
            if(refreshToken==token) return resolve(phone);
            reject(createHttpError.Unauthorized('ورود انجام نشد'))
        })
    })

}

function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile=path.join(__dirname,'..','..','public',fileAddress);
if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile) 
    }  
}
function checkDataForUpdate(data,blackList=[]){
    let nullishData = ["", " ", "0", 0, null, undefined];
      Object.keys(data).forEach((key) => {
        if (blackListField.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });
}
module.exports={
    RandomNumberGenerator,
    checkDataForUpdate,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic
}
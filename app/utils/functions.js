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
            userId:user._id
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
function getTime(seconds) {
    let total = Math.round(seconds) / 60;
    let [minutes, percent] = String(total).split(".");
    let second = Math.round((percent * 60) / 100).toString().substring(0, 2);
    let houre = 0;
    if (minutes > 60) {
        total = minutes / 60
         let [h1, percent] = String(total).split(".");
         houre = h1,
         minutes = Math.round((percent * 60) / 100).toString().substring(0, 2);
    }
    if(String(houre).length ==1) houre = `0${houre}`
    if(String(minutes).length ==1) minutes = `0${minutes}`
    if(String(second).length ==1) second = `0${second}`
    
    return (houre + ":" + minutes + ":" +second)
}
function checkDataForUpdate(data={},blackListField=[]){
    let nullishData = ["", " ", "0", 0, null, undefined];
      Object.keys(data).forEach((key) => {
        if (blackListField.includes(key)) delete data[key];
        if (typeof data[key] == "string") data[key] = data[key].trim();
        if (Array.isArray(data[key]) && data[key].length > 0)
          data[key] = data[key].map((item) => item.trim());
        if (nullishData.includes(data[key])) delete data[key];
      });
}
function setFeatures(body) {
    const { colors, width, weight, height, length } = body;
    let features = {};
    features.colors = colors;
    if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
        if (!width) features.width = 0;
        else features.width = +width;
        if (!height) features.height = 0;
        else features.height = +height;
        if (!weight) features.weight = 0;
        else features.weight = +weight;
        if (!length) features.length = 0;
        else features.length = +length;
    }
    return features
}
function ListOfImagesFromRequest(files, fileUploadPath) {
    if (files?.length > 0) {
        return ((files.map(file => path.join(fileUploadPath, file.filename))).map(item => item.replace(/\\/g, "/")))
    } else {
        return []
    }
}

function copyObject(object){
    return JSON.parse(JSON.stringify(object));
}
module.exports={
    RandomNumberGenerator,
    ListOfImagesFromRequest,
    checkDataForUpdate,
    setFeatures,
    getTime,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    copyObject,
    deleteFileInPublic
}
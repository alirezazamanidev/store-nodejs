const Joi=require('joi');
const { MongoIDPattern } = require('../../../utils/constans');
const createHttpError = require('http-errors');

const createBlogSchema=Joi.object({
    title:Joi.string().required().min(3).max(30).message('dkdkgk').error(createHttpError.BadRequest('فیلد عنوان نمی تواند خالی  بماند')),
    text:Joi.string().required().error(createHttpError.BadRequest('فیلد متن نمی تواند خالی  بماند')),
    short_text:Joi.string().required().error(createHttpError.BadRequest('فیلد متن کوتاه نمی نواند خالی بماند')),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createHttpError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    category:Joi.string().required().pattern(MongoIDPattern).error(createHttpError.BadRequest('فیلد دسته بندی صحیح نیس')),
    
    tags:Joi.array().min(0).max(20).error(createHttpError.BadRequest('فیلد تگ صحیح نیس')),
    fileUploadPath:Joi.allow()

})

module.exports={
    createBlogSchema
}
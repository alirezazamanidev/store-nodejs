const Joi=require('joi');
const createHttpError=require('http-errors');
const { MongoIDPattern } = require('../../../utils/constans');
const categorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان صحیح نمی باشد')),
    parent: Joi.string().pattern(MongoIDPattern).error(createHttpError.BadRequest(new createHttpError.BadRequest("شناسه وارد شده صحیح نمیباشد")))
})
const UpdateCategorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان صحیح نمی باشد')),

})

module.exports={
    categorySchema,
    UpdateCategorySchema
}
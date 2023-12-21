const Joi=require('joi');
const createHttpError=require('http-errors');
const categorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان صحیح نمی باشد')),
    parent:Joi.string().error(createHttpError.BadRequest('شناسه ارسال شده صحیح نمی باشد'))
})
const UpdateCategorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(createHttpError.BadRequest('عنوان صحیح نمی باشد')),

})

module.exports={
    categorySchema,
    UpdateCategorySchema
}
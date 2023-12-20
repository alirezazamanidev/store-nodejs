const Joi=require('@hapi/joi');

const categorySchema=Joi.object({
    title:Joi.string().min(3).max(30).error(new Error('عنوان صحیح نمی باشد')),
    parent:Joi.string().error(new Error('شناسه ارسال شده صحیح نمی باشد'))
})

module.exports={
    categorySchema
}
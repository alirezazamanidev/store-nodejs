const Joi=require('joi');
createHttpError=require('http-errors');
const getOtpSchema=Joi.object({
    phone:Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest('شماره موبایل وارد شده نادرست است'))
})
const checkOtpSchema=Joi.object({
    phone:Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(createHttpError.BadRequest('شماره موبایل وارد شده نادرست است')),
    code:Joi.string().min(4).max(6).error(createHttpError.BadRequest('کد ارسال شده صحیح نمی باشد'))
})

module.exports={
    checkOtpSchema,
    getOtpSchema
};
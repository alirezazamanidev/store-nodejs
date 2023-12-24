const Joi=require('joi');
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constans");
const createRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان  صحیح نمیباشد")),
  
    permisions : Joi.allow()
});

module.exports = {
    createRoleSchema
}
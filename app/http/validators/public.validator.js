const Joi =require('joi');
const { MongoIDPattern } = require('../../utils/constans');
const createHttpError = require('http-errors');
const ObjectIdValidator=Joi.object({
    id:Joi.string().error(createHttpError.BadRequest('Id is invalidad'))
})

module.exports={
 ObjectIdValidator   
}
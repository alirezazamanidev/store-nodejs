const mongoose=require('mongoose');

const PermistionSchema=new mongoose.Schema({

    title:{type:String,unique:true},
    description:{type:String,default:''}

},{timestamps:true,toJSON:{virtuals:true}});


module.exports= {
    PermissonModel:mongoose.model('permission',PermistionSchema)
}
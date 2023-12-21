const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId,ref:'user',required:true},
    comment:{type:String,required:true},
    parent:{type:mongoose.Types.ObjectId,ref:"Comment"}
  },{timestamps:true})


module.exports={
    commentSchema
}
const mongoose = require("mongoose");

const commentSchema=new mongoose.Schema({
  user:{type:mongoose.Types.ObjectId,ref:'user',required:true},
  comment:{type:String,required:true},
  parent:{type:mongoose.Types.ObjectId}
},{timestamps:true})
const Schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String] ,default:[]},
  category: { type:[ mongoose.Types.ObjectId], required: true },
  comments:{type:[commentSchema],default:[]},
  like:{type:[mongoose.Types.ObjectId],ref:'user' ,default:[]},
  dislike:{type:[mongoose.Types.ObjectId],ref:'user' ,default:[]},
  bookmark:{type:[mongoose.Types.ObjectId],ref:'user' ,default:[]},



},{timestamps:true,versionKey:false});
module.exports = {
    BlogModel: mongoose.model("Blog", Schema),
};

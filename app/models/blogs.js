const mongoose = require("mongoose");
const { commentSchema } = require("./public");


const Schema = new mongoose.Schema({
  author: { type: mongoose.Types.ObjectId,ref:'user', required: true },
  title: { type: String, required: true },
  short_text: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String] ,default:[]},
  category: { type:[ mongoose.Types.ObjectId],ref:'Category', required: true },
  comments:{type:[commentSchema],default:[]},
  likes:{type:[mongoose.Types.ObjectId],ref:'user' ,default:[]},
  dislikes:{type:[mongoose.Types.ObjectId],ref:'user' ,default:[]},
  bookmarks:{type:[mongoose.Types.ObjectId],ref:'user' ,default:[]},



},{timestamps:true,versionKey:false});
Schema.virtual("imageURL").get(function(){
  return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`
})
module.exports = {
    BlogModel: mongoose.model("Blog", Schema),
};

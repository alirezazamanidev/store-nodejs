const mongoose=require('mongoose');
const { commentSchema } = require('./public');
const episodeSchema=new mongoose.Schema({
    title:{type:String,required:true},
    text:{type:String,default:''},
    type:{type:String,default:'free'},
    time:{type:String,required:true},

})
const chapterSchema=new mongoose.Schema({
    title:{type:String,required:true},
    text:{type:String,default:''},
    episodes:{type:[episodeSchema],default:[]},
    title:{type:String,required:true},
})
const Schema=new mongoose.Schema({
    title:{type:String,required:true},
    short_text:{type:String,required:true},
    text:{type:String,required:true},
    image :{type:String,required:true},
    tags: { type: [String] ,default:[]},
    category: { type: mongoose.Types.ObjectId,ref:'Category', required: true },
    comments:{type:[commentSchema],default:[]},
    likes:{type:[mongoose.Types.ObjectId] ,default:[]}, 
    dislikes:{type:[mongoose.Types.ObjectId] ,default:[]},
    bookmark:{type:[mongoose.Types.ObjectId] ,default:[]},
    price:{type:Number,default:0},
    chapters:{type:[chapterSchema],default:[]},
    disCount:{type:Number,default:0},
    type:{type:String,default:'free'}, // free or cash
    time:{type:String,default:'00:00:00'},
    teacher:{type:mongoose.Schema.ObjectId,ref:'user'},
    students:{type:[mongoose.Types.ObjectId],ref:'user',default:[]}
});
Schema.index({title:"text",short_text:"text",text:"text"});
module.exports= {
    CourseModel:mongoose.model('Course',Schema)
}
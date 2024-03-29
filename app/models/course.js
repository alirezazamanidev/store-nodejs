const mongoose=require('mongoose');
const { commentSchema } = require('./public');
const { getTimeOfCourse } = require('../utils/functions');
const episodeSchema=new mongoose.Schema({
    
    title:{type:String,required:true},
    text:{type:String,default:''},
    type:{type:String,default:'unlock'},
    time:{type:String,required:true},
    videoAddress:{type:String,required:true}
})
episodeSchema.virtual("videoURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.videoAddress}`
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
    disCunt:{type:Number,default:0},
    typoe:{type:String,default:'free'}, // free or cash
    status:{type:String,default:'notStarted' /*notStarted,complated,holding */},
    teacher:{type:mongoose.Schema.ObjectId,ref:'user',required:true},
    students:{type:[mongoose.Types.ObjectId],ref:'user',default:[]}
},{timestamps:true,toJSON:{virtuals:true}});
Schema.index({title:"text",short_text:"text",text:"text"});
Schema.virtual('imageUrl').get(function(){
    return `${process.env.BASE_URL}:${process.env.PORT}/${this.image}`;
});
Schema.virtual('totalTime').get(function(){
    return getTimeOfCourse(this.chapters || []);
})
module.exports= {
    CourseModel:mongoose.model('Course',Schema)
}
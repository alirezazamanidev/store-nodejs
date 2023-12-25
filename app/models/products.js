const mongoose=require('mongoose');
const { commentSchema } = require('./public');


const Schema=new mongoose.Schema({
    title:{type:String,required:true},
    short_text:{type:String,required:true},
    text:{type:String,required:true},
    images :{type:[String],required:true},
    tags: { type: [String] ,default:[]},
    category: { type: mongoose.Types.ObjectId,ref:'Category', required: true },
    comments:{type:[commentSchema],default:[]},
    likes:{type:[mongoose.Types.ObjectId] ,default:[]}, 
    dislikes:{type:[mongoose.Types.ObjectId] ,default:[]},
    bookmark:{type:[mongoose.Types.ObjectId] ,default:[]},
    price:{type:Number,default:0},
    count:{type:Number ,default:0},
    disCount:{type:Number,default:0},
    type:{type:String,required:true}, // virtual or video
    time:{type:String},
    supllier:{type:mongoose.Schema.ObjectId,ref:'user',required:true},
    format:{type:String},
    features:{type:Object,default:{
        length:"",
        height:"",
        width:"",
        weight:"",
        colors:[],
        models:[],
        madeIn:''
    }},

})

Schema.index({title:'text',short_text:"text",text:'text'});
Schema.virtual("imagesURL").get(function(){
    return this.images.map(image => `${process.env.BASE_URL}:${process.env.PORT}/${image}`)
})
module.exports= {
    ProductModel:mongoose.model('product',Schema)
}
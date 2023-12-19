const mongoose=require('mongoose');


const Schema=new mongoose.Schema({
    title:{type:String,required:true},
    short_disc:{type:String,required:true},
    description:{type:String,required:true},
    images :{type:[String],required:true},
    tags: { type: [String] ,default:[]},
    category: { type: mongoose.Types.ObjectId, required: true },
    comments:{type:[],default:[]},
    like:{type:[mongoose.Types.ObjectId] ,default:[]},
    dislike:{type:[mongoose.Types.ObjectId] ,default:[]},
    bookmark:{type:[mongoose.Types.ObjectId] ,default:[]},
    price:{type:Number,default:0},
    count:{type:Number ,default:0},
    disCount:{type:Number,default:0},
    type:{type:String,required:true},
    time:{type:String},
    teacher:{type:mongoose.Schema.ObjectId},
    format:{type:String},
    feture:{type:Object,default:{
        length:"",
        height:"",
        width:"",
        weight:"",
        colors:[],
        models:[],
        madein:''
    }},
    format:{type:String}

})
module.exports= {
    ProductModel:mongoose.model('product',Schema)
}
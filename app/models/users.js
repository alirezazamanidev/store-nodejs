const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    productId:{type:mongoose.Types.ObjectId,ref:"product"},
    count:{type:Number,default:1},
});
const courseSchema=new mongoose.Schema({
    courseId:{type:mongoose.Types.ObjectId,ref:"Course"},
    count:{type:Number,default:1},
});
const basketSchema=new mongoose.Schema({
    course:{type:[courseSchema],default:[]},
    product:{type:[productSchema],default:[]}
})
const Schema=new mongoose.Schema({
    first_name:{type:String},
    last_name:{type:String},
    username:{type:String,lowercase:true},
    phone:{type:String,required:true},
    email:{type:String,lowercase:true},
    password:{type:String},
    otp:{type:Object,default:{
        code:0,
        expiresIn:0
    }},
    bills:{type:[],default:[]},
    diacount:{type:Number,default:0},
    birthDay:{type:String},
    Role:{type:String,default:'User'},
    courses:{type:[mongoose.Types.ObjectId],ref:'Course',default:[]},
    basket:{type:basketSchema}

},{timestamps:true,toJSON:{virtuals:true}});

Schema.index({first_name:"text",last_name:'text',username:"text",phone:'text',email:'text'})
module.exports= {
    UserModel:mongoose.model('user',Schema)
}
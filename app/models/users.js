const mongoose=require('mongoose');

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
    Roles:{type:[String],default:['User']},
    courses:{type:[mongoose.Types.ObjectId],ref:'Course',default:[]}

},{timestamps:true,toJSON:{virtuals:true}});

Schema.index({first_name:"text",last_name:'text',username:"text",phone:'text',email:'text'})
module.exports= {
    UserModel:mongoose.model('user',Schema)
}
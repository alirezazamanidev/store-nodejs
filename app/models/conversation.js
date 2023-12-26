const mongoose=require('mongoose');
const messageSchema=new mongoose.Schema({
    sender:{type:mongoose.Types.ObjectId,ref:'user'},
    dateTime:{type:String}
})
const RoomSchema=new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    image:{type:String},
    messages:{type:[messageSchema], default:[]}
})
const converSationSchema=new mongoose.Schema({
    title:{type:String,required:true},
    endpoint:{type:String,required:true},
    rooms:{type:[RoomSchema],default:[]}
})

module.exports={
    ConverSationModel:mongoose.model('converstion',converSationSchema)
}
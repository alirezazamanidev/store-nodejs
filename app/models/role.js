const mongoose=require('mongoose');

const RoleSchema=new mongoose.Schema({

    title:{type:String,unique:true},
    permisions:{type:[mongoose.Types.ObjectId],ref:'permissions',default:[]}

},{timestamps:true,toJSON:{virtuals:true}});


module.exports= {
    RoleModel:mongoose.model('role',RoleSchema)
}
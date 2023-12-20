const mongoose=require('mongoose');


const Schema=new mongoose.Schema({
    title:{type:String,required:true},
    parent:{type:mongoose.Types.ObjectId,ref:'Category',default:undefined},
},{timestamps:true,toJSON:{virtuals:true},id:false,versionKey:false})


Schema.virtual('children',{
    ref:'Category',
    localField:'_id',
    foreignField:"parent"
});

function autoPopulate(next){
    this.populate([{
        path:'children',
    
        
    }])
    next();
}

Schema.pre('findOne',autoPopulate).pre('find',autoPopulate);
module.exports= {
    CategoryModel:mongoose.model('Category',Schema)
}
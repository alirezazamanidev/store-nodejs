const { text } = require('express');
const mongoose=require('mongoose');


const Schema=new mongoose.Schema({

    title:{type:String},
    text:{type:String},
    image:{type:String,required:true},
    type:{type:String,default:'main'}
})
module.exports= {
    SliderModel:mongoose.model('Slider',Schema)
}
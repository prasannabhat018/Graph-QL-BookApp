const mongoose=require('mongoose')

const {Schema}=mongoose;

const authorSchema=new Schema({
    name:String,
    age:Number,
    authorId:String,
})

module.exports=mongoose.model('Author',authorSchema)
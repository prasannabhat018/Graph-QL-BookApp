const express=require('express')
const { graphqlHTTP }=require('express-graphql')
const schema=require('./schema/schema')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

//to allow cross origin request that is request from different ports

app.use(cors())

mongoose.connect("mongodb+srv://Pmbboy42:Pmbboy42@cluster0.ln3gt.mongodb.net/books?retryWrites=true&w=majority")
    .then(()=>console.log(`Connected to database!!`))
    .catch((err)=>console.error(err))

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))


const PORT=process.env.PORT || 4000

app.listen(PORT,()=>{
    console.log(`Running on Port-${PORT}`)
})
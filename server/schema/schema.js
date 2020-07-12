const graphql=require('graphql')
const BookModel=require('../models/book')
const AuthorModel=require('../models/author')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
}=graphql

const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent){
                return AuthorModel.findById(parent.authorId)
            }
        }
    })
})

const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:GraphQLList(BookType),
            resolve(parent)
            {
                return BookModel.find({authorId:parent.id})
            }
        }
    }) 
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:()=>({
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return BookModel.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return AuthorModel.findById(args.id)
            }
        },
        books:{
            type:GraphQLList(BookType),
            resolve(){
               return BookModel.find({})
            }
        },
        authors:{
            type:GraphQLList(AuthorType),
            resolve(){
                return AuthorModel.find({})
            }
        },
    })
})


const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                age:{type:GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                let author=new AuthorModel({
                    name:args.name,
                    age:args.age,
                })
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                genre:{type:GraphQLNonNull(GraphQLString)},
                authorId:{type:GraphQLNonNull(GraphQLID)},
            },
            resolve(parent,args){
                let book=new BookModel({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId,
                })
                return book.save()
            }
        }
    }
})


module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
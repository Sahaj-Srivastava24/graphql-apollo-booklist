const graphql = require('graphql');
const _ = require('lodash');
const bookModel = require('../models/bookModel');
const authorModel = require('../models/authorModel');
const { GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema, 
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// Dummy Data
// var books = [
//   {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
//   {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2'},
//   {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorId: '3'},
//   {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
//   {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorId: '3'},
//   {name: 'The Light Fantastic', genre: 'Fantasy', id: '6', authorId: '3'}
// ]
// const authors =  [
//   { name : 'Patrick Rothfuss', age : 44, id : "1" },
//   { name : 'Brandon Sanderson', age : 42, id : "2" },
//   { name : 'Terry Pratchett', age : 66, id : "3" }
// ]

const BookType = new GraphQLObjectType({
  name : 'Book',
  fields: () => ({
    id : { type: GraphQLID},
    name : { type: GraphQLString},
    genre : { type: GraphQLString},
    author : {
      type: AuthorType,
      resolve(parent, args){
        // return _.find(authors, { id : parent.authorId })
        return authorModel.findById(parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name : 'Author',
  fields: () => ({
    id : { type: GraphQLID},
    name : { type: GraphQLString},
    age : { type: GraphQLInt},
    books : {
      type : new GraphQLList(BookType),
      resolve(parent, args)
      {
        // return _.filter(books, { authorId : parent.id})
        return bookModel.find({ authorId : parent.id })
      }
    }
  })
})

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        // Function to get data from 
        // return _.find(books, { id : args.id })
        return bookModel.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args){
        // Function to get data from 
        // return _.find(authors, { id : args.id })
        return authorModel.find({authorId : args.id})
      }
    },
    books : {
      type: new GraphQLList(BookType),
      resolve(parent, args)
      {
        // return books
        return bookModel.find({})
      }
    },
    authors : {
      type: new GraphQLList(AuthorType),
      resolve(parent, args)
      {
        // return authors
        return authorModel.find({})
      }
    }
  }
})

const mutationQuery = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor : {
      type: AuthorType,
      args: {
        name: { type : new GraphQLNonNull(GraphQLString)},
        age: { type : new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent,args)
      {
        let author = new authorModel({
          name : args.name,
          age : args.age
        })
        return author.save()
      }
    },
    addBook : {
      type: BookType,
      args: {
        name: { type : new GraphQLNonNull(GraphQLString)},
        genre: { type : new GraphQLNonNull(GraphQLString)},
        authorId: { type : GraphQLID},
      },
      resolve(parent,args)
      {
        let book = new bookModel({
          name : args.name,
          genre : args.genre,
          authorId : args.authorId,
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: mutationQuery
})
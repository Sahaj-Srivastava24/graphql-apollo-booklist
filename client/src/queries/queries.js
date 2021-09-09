import { gql } from '@apollo/client'

const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
    }
  }
`

const getauthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

const setBookQuery = gql`
  mutation addBook($name :String!, $genre: String!, $authorId : ID!){
    addBook(name: $name, genre: $genre , authorId: $authorId)
    {
      name
      genre
    }
  }
`

// const setBookQuery = gql`
//   mutation{
//     addBook(name: "Harry Potter 4", genre: "Magic" , authorId: "61390105cb050ab9fdb27e31")
//     {
//       name
//       genre
//     }
//   }

// `

export { getBooksQuery, getauthorsQuery, setBookQuery }
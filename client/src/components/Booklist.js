import React from 'react'
import { gql, useQuery } from '@apollo/client'

const getBooksQuery = gql`
  {
    books{
      name
      genre
      id
    }
  }
`

function Booklist() {

  const {loading, data } = useQuery(getBooksQuery)
  if( data !== undefined)
    console.log(data)
  var displayBooks = () => 
  {
    if( loading === true)
      return (<li>Loading</li>)
    else
    {
      return data.books.map( (book) => {
        return (<li key={book.id}>{book.name}</li>)
      })
    }
  }
  // console.log(this.props)
  return (
    <div>
      <ul>
        {displayBooks()}
      </ul>
    </div>
  )
}

export default Booklist;

import React from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from "../queries/queries"

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
  return (
    <div>
      <ul>
        {displayBooks()}
      </ul>
    </div>
  )
}

export default Booklist;

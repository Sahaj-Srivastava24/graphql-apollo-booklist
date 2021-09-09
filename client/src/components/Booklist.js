import React,{ useState } from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery, getBookQuery } from "../queries/queries"
import BookDetails from './BookDetails'



function Booklist() {

  const { loading, data } = useQuery(getBooksQuery)
  const [bookID, setbookID] = useState();
  
  const { data: selectedBook } = useQuery(getBookQuery, {
    variables: { id : bookID }
  })

  var displayBooks = () => 
  {
    if( loading === true)
      return (<li>Loading</li>)
    else
    {
      return data.books.map( (book) => {
        return (<li key={book.id} onClick={ (e) => {setbookID(book.id)} }>{book.name}</li>)
      })
    }
  }
  return (
    <div>
      <ul>
        {displayBooks()}
        <BookDetails book = {null || selectedBook} />
      </ul>
    </div>
  )
}

export default Booklist;

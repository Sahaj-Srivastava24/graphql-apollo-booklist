import React from 'react'
import { useQuery } from '@apollo/client'


function BookDetails({ book}) {
  console.log(book)

  function displayInformation(){    
    if( book == null )
    {
      return ( <h2>No Book was selected</h2> )
    }
    else{
      const { name, genre, author, age} = book;
      console.log(name)
      // return(
      // <>
      //   <h2> Name :- { name }</h2>
      //   <h3> Genre :- { genre } </h3>
      //   <h3> Author :- { author.name } </h3>
      //   <h4> Age :- { age }</h4>
      //   <h4> More Books by Author :- </h4>
      //   <ul>
      //     {book.author.map(book => {
      //       return (<li> {book.name} </li>)
      //     })}
      //   </ul>
      // </>
      // )
    }

  }
  return (
    <div>
      <h1>Book Details</h1>
      {displayInformation()}
    </div>
  )
}

export default BookDetails

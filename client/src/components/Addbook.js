import React from 'react'
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

function Addbook() {
  return (
    <div>
      <form id="add-book">

        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select Author</option>
          </select>
        </div>

        <button></button>

      </form>
    </div>
  )
}

export default Addbook

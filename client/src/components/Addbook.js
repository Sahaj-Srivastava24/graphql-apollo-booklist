import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getauthorsQuery, setBookQuery, getBooksQuery } from "../queries/queries"


function Addbook() {

  const [ book, setBook ] = useState({ name: "", genre: "", authorId: ""})
  // const [ bookName, setbookName ] = useState("");
  // const [ bookGenre, setbookGenre ] = useState("");
  // const [ bookAuthorId, setbookAuthorId ] = useState("");

  const { loading:getloading, error:geterror, data:getdata } = useQuery(getauthorsQuery)
  function defOptions(){
    // console.log(getdata)
    if( getloading === true )
      return (<option disabled>Authors loading</option>)
    if(geterror)
      console.log(geterror)
    return getdata.authors.map( author => {
      // console.log(author.name)
      return (<option key={ author.id } value={ author.id }>{ author.name }</option>)
    })
  }

  const [ mutateFunc, { error:seterror, loading:setloading, data:setdata}] = useMutation(setBookQuery)

  function handleSubmit(e){
    e.preventDefault();
    // console.log(bookName, bookGenre, bookAuthorId)
    mutateFunc({
      variables:{ name:book.name, genre: book.genre, authorId: book.authorId },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  return (
    <div>
      <form id="add-book" onSubmit= { e => handleSubmit(e)}>

        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={ (e) => setBook(prevState => ({...prevState, name: e.target.value}))} />
          {/* <input type="text" onChange={ (e) => setbookName(e.target.value) } /> */}
        </div>
        
        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={ (e) => setBook({ ...book, genre : e.target.value})} />
          {/* <input type="text" onChange={ (e) => setbookGenre(e.target.value) } /> */}
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={ (e) => setBook({ ...book, authorId : e.target.value })}>
          {/* <select onChange={ (e) => setbookAuthorId(e.target.value) }> */}
            <option>Select Author</option>
            { defOptions() }
          </select>
        </div>

        <button></button>

      </form>
    </div>
  )
}

export default Addbook

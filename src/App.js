import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSection from './BookSection'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state={
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    currentlyReading:[],
    wantToRead:[],
    read:[],
    books:[]
  }

  componentDidMount() {
    this.getAllBooks()
  }
  getAllBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
      this.filterBooks(books)
        
      })
  }
  filterBooks = (books) => {
    let curentlyReading= books.filter((book)=>(book.shelf==='currentlyReading'))
    let wantToRead= books.filter((book)=>(book.shelf==='wantToRead'))
    let read= books.filter((book)=>(book.shelf==='read'))
    this.setState(()=> ({
      currentlyReading: curentlyReading,
      wantToRead: wantToRead,
      read: read,
      books: books
    }))

  }
  shelfChanged = (value, book) => {
    BooksAPI.update(book, value)
    .then((book) => {
    })
    let books = this.state.books
    const bookIndex = books.findIndex((currentBook) => (currentBook.id === book.id ))
    if (bookIndex === -1) {
      book.shelf = value
      books = books.concat([book])
    } else {
      books[bookIndex].shelf = value
    }
    this.filterBooks(books)
  }
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={()=>(
         <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookSection currentShelf={'currentlyReading'} books={this.state.currentlyReading} title={'Currently Reading'} shelfChanged={this.shelfChanged}/>
                  <BookSection currentShelf={'wantToRead'} books={this.state.wantToRead} title={'Want To Read'} shelfChanged={this.shelfChanged}/>
                  <BookSection currentShelf={'read'} books={this.state.read} title={'Read'} shelfChanged={this.shelfChanged}/>
                </div>
              </div>
			  <div className="open-search">
              <Link to='/search'>Add a book</Link>
              </div>
         </div>

    		
    	)}/>
		<Route path='/search' render={({history})=>(
          <SearchBooks books={this.state.books} shelfChanged={(value, book)=>{
          	this.shelfChanged(value, book)
			history.push('/')
        	}}/>
        
        )}/>
      </div>
    )
  }
}

export default BooksApp

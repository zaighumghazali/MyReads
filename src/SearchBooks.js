import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import CurrentBook from './CurrentBook'
import {debounce} from 'lodash'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
  state = {
    books:[]
  }
  valueChanged = (event) => {
    this.debouncedSearch(event.target.value);
    
  }
  debouncedSearch = debounce((value)=> {
    if (value === '') {
      this.setState(()=> ({
        books: []
      }))
      return
    }
    BooksAPI.search(value, 50)
    .then((books) => {
      this.setState(()=> ({
        books: books
      }))  
     })
  }, 1000);
  shelfChanged = (value, book) => {
    this.props.shelfChanged(value, book)
  }
  getCurrentShelfOfBook = (book) => {
    let filteredBooks = this.props.books.filter((currentBook) => (currentBook.id === book.id))
    if (filteredBooks.length === 0) {
       return 'none'
    } else {
      return filteredBooks[0].shelf
    }
  }
  render () {
    return (
      <div>
         <div className="search-books-bar">
       		<Link className="close-search" to='/'>Close</Link>
            <div className="search-books-input-wrapper">
				<input type="text" placeholder="Search by title or author" onChange={this.valueChanged}/>
			</div>
		 </div>
    	 <div className="bookshelf">
    	 	<div className="bookshelf-books">
          		<ol className="books-grid">
            		{this.state.books.map((book) => (
              		<li key={book.id}>
              		<CurrentBook currentShelf={this.getCurrentShelfOfBook(book)} book={book} shelfChanged={this.shelfChanged}/>
			  		</li>
            		))}
          		</ol>
        	</div>
		</div>
	  </div>
    
    )
  }
}
SearchBooks.PropTypes = {
  shelfChanged: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}
export default SearchBooks
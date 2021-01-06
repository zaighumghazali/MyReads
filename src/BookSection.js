import React, {Component} from 'react'
import CurrentBook from './CurrentBook'

class BookSection extends Component {
  shelfChanged = (value, book) => {
    this.props.shelfChanged(value, book)
  }
  
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key={book.industryIdentifiers[0].identifier}>
              	<CurrentBook currentShelf={this.props.currentShelf} book={book} shelfChanged={this.shelfChanged}/>
			  </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default BookSection;
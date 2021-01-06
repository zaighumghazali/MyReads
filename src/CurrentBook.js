import React, {Component} from 'react'
import ShelfChanger from './ShelfChanger'

class CurrentBook extends Component {
  shelfChanged = (value) => {
    this.props.shelfChanged(value, this.props.book)
  
  }
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
          
          <ShelfChanger currentShelf={this.props.currentShelf} shelfChanged={this.shelfChanged}/>
          
       </div>
       <div className="book-title">{this.props.book.title}</div>
       <div className="book-authors">{this.props.book.authors && this.props.book.authors.join("\n")}</div>
      </div>
    
    )

    
  }
}
export default CurrentBook;
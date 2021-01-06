import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
  valueChanged = (event) => {
    this.props.shelfChanged(event.target.value)
  }
  render() {
    return(
      <div className="book-shelf-changer">
            <select onChange={this.valueChanged}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading" selected={'currentlyReading' === this.props.currentShelf} >Currently Reading</option>
            <option value="wantToRead" selected={'wantToRead' === this.props.currentShelf}>Want to Read</option>
            <option value="read" selected={'read' === this.props.currentShelf}>Read</option>
            <option value="none" selected={'none' === this.props.currentShelf}>None</option>
            </select>
      </div>    
    )


  }

}
ShelfChanger.PropTypes = {
  currentShelf: PropTypes.string.isRequired,
  shelfChanged: PropTypes.func.isRequired,
}
export default ShelfChanger;
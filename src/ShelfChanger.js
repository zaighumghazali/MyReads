import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {
  valueChanged = (event) => {
    this.props.shelfChanged(event.target.value)
  }
  render() {
    return(
      <div className="book-shelf-changer">
            <select onChange={this.valueChanged} value={this.props.currentShelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading" >Currently Reading</option>
            <option value="wantToRead" >Want to Read</option>
            <option value="read" >Read</option>
            <option value="none" >None</option>
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
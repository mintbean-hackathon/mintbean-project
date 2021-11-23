import React from 'React'
import {createNewDrawing} from '../store/drawings'
import {connect} from 'react-redux'

const defaultState = {
  name: '',
  description: ''
}

class AddDrawing extends React.Component {
  constructor() {
    super()
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createNewDrawing({...this.state})
    this.setState(defaultState)
  }

  render() {
    const {name, description} = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Drawing Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Drawing Name"
            onChange={this.handleChange}
          />

          <label htmlFor="description">Drawing Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Drawing Description"
            onChange={this.handleChange}
          />

          <button type="submit">Save Drawing</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    newDrawing: state.drawings
  }
}

const mapDispatch = dispatch => {
  return {
    createNewDrawing: drawing => dispatch(createNewDrawing(drawing))
  }
}

export default connect(mapState, mapDispatch)(AddDrawing)

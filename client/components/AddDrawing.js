import React from 'React'
import {createNewDrawing} from '../store/drawings'
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import DrawingTool from './DrawingTool'

const defaultState = {
  name: '',
  description: ''
}

class AddDrawing extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    ////handling name and description
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
    console.log('state in AddDrawing.js==>', this.state)
    console.log('props in AddDrawing.js==>', this.props)
    return (
      <div>
        <div>
          <h1> Add Drawing</h1>
        </div>
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
        <div>
          <Route component={DrawingTool} onChange={this.handleChange} />
        </div>
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

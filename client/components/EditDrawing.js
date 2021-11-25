import React from 'react'
import {updateDrawingThunk} from '../store/drawings'
import {connect} from 'react-redux'
import {fetchSingleDrawing} from '../store/singleDrawing'

const defaultState = {
  name: '',
  description: ''
}

class EditDrawing extends React.Component {
  constructor() {
    super()
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    const drawingId = this.props.match.params.drawingId
    this.props.fetchSingleDrawing(drawingId)
    const {name, description} = this.props.updatedDrawing
    if (drawingId) {
      this.setState({
        name,
        description
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {name, description, id} = this.props.updatedDrawing
    if (prevProps.updatedDrawing.id !== id) {
      this.setState({
        name,
        description
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateDrawingThunk({
      ...this.props.updatedDrawing,
      ...this.state
    })
  }

  render() {
    const {name, description} = this.state
    console.log('state of EditDrawing===>', this.state)
    console.log('props of EditDrawing===>', this.props)
    return (
      <div className="form">
        <form id="add-drawing-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name of drawing"
            onChange={this.handleChange}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="drawing description"
            onChange={this.handleChange}
          />

          <button type="submit" className="submit-button">
            Save Drawing
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    updatedDrawing: state.singleDrawingReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDrawingThunk: drawing => dispatch(updateDrawingThunk(drawing)),
    fetchSingleDrawing: drawingId => dispatch(fetchSingleDrawing(drawingId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditDrawing)

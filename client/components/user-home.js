import React from 'react'
import {FetchDrawings, deleteDrawingThunk} from '../store/drawings'
import {connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import AddDrawing from './AddDrawing'
/**
 * COMPONENT-This is for
 * UserHomePageDrawingLists
 */

export class UserHome extends React.Component {
  componentDidMount() {
    this.props.FetchDrawings()
  }

  render() {
    const drawings = this.props.drawings
    console.log('this.props for user-home.js==>', this.props)
    return (
      <div>
        <div>
          <h1>All Drawings</h1>
          <h2>List of Drawing:</h2>
          {drawings.map(drawing => {
            return (
              <div key={drawing.id}>
                <div>
                  <h2>{drawing.name}</h2>

                  <p>{drawing.description}</p>

                  <div>
                    <Link to={`/drawings/${drawing.id}/edit`}>
                      <button type="button">Edit Drawing</button>
                    </Link>

                    <button
                      type="button"
                      onClick={() => this.props.deleteDrawingThunk(drawing)}
                    >
                      Remove Drawing
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
          <div />
        </div>

        <div>
          <Route component={AddDrawing} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    drawings: state.drawings
  }
}

const mapDispatchToProps = dispatch => {
  return {
    FetchDrawings: () => dispatch(FetchDrawings()),
    deleteDrawingThunk: drawingId => dispatch(deleteDrawingThunk(drawingId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

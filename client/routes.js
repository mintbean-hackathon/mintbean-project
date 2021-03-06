import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import FundrawityHomepage from './components/FundrawityHomepage'
import updateUser from './components/updateUser'
import AddDrawing from './components/AddDrawing'
import EditDrawing from './components/EditDrawing'
import DrawingTool from './components/DrawingTool'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/updateprofile" component={updateUser} />
              <Route exact path="/drawings/adddrawing" component={AddDrawing} />
              <Route path="/drawings/:drawingId/edit" component={EditDrawing} />
              {/* <Route path='/drawings/addDrawing' component={DrawingTool}/> */}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route exact path="/login" component={Login} />
        </Switch>
        <Route exact path="/" component={FundrawityHomepage} />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

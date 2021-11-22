import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import FundrawityHomepage from './'
import {Route, Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  console.log('this is props==>', props)

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Route component={FundrawityHomepage} />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}

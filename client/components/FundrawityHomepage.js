import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT- This is where the LandingPage Willbe
 */
export const FundrawityHomepage = props => {
  console.log('newpropsl==>', props)
  return (
    <div>
      <h3>This is the fun land </h3>
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

export default connect(mapState)(FundrawityHomepage)

/**
 * PROP TYPES
 */
FundrawityHomepage.propTypes = {
  email: PropTypes.string
}
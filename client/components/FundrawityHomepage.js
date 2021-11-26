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
      <div className="division">
        <div>
          <h2>Explore your creativity with FunDrawity</h2>
          <h3>
            We provide amazing and easy to use platform to create digital arts
          </h3>
        </div>

        <div>
          <h3>Sort Demo Video of Fundrawity</h3>
          <iframe
            height="480"
            width="500"
            src="https://www.youtube.com/embed/il_t1WVLNxk"
          />
        </div>
      </div>

      <div className="division">
        <div>
          <h2>Fundrawity Tutorial</h2>
          <p>adsalshgkljaghklgakdfdkjlfhadjklsfhdjklfhadjkslfh</p>
        </div>
      </div>

      <div className="division">
        <div>
          <h2>Meet the Engineers</h2>
        </div>
      </div>
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

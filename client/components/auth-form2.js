import React from 'react'
import {connect} from 'react-redux'
import {Typography, TextField, Box, Button} from '@mui/material'
import PropTypes from 'prop-types'
import {auth} from '../store'
import useStyles from './auth-form-styles'

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const classes = useStyles()

  if (displayName === 'Sign Up') {
    return (
      <div className={classes.root}>
        <Box className={classes.box}>
          <form onSubmit={handleSubmit} name={name}>
            <Typography variant="h6" color="white" htmlFor="firstName">
              First Name
            </Typography>
            <TextField
              variant="outlined"
              required
              size="small"
              className={classes.textfield}
              name="firstName"
              type="text"
            />

            <Typography variant="h6" color="white" htmlFor="lastName">
              Last Name
            </Typography>
            <TextField
              variant="outlined"
              required
              size="small"
              className={classes.textfield}
              name="lastName"
              type="text"
            />

            <Typography variant="h6" color="white" htmlFor="email">
              Email
            </Typography>
            <TextField
              variant="outlined"
              required
              size="small"
              className={classes.textfield}
              name="email"
              type="text"
            />

            <Typography variant="h6" color="white" htmlFor="password">
              Password
            </Typography>
            <TextField
              variant="outlined"
              required
              size="small"
              className={classes.textfield}
              name="password"
              type="password"
            />

            <div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.profile}
                type="submit"
              >
                {displayName}
              </Button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </Box>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName
      const lastName = evt.target.lastName
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

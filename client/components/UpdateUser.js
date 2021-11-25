import React from 'react'
import {fetchUpdateUser} from '../store/users'
import {Typography, TextField, Box, Button} from '@mui/material'
import {connect} from 'react-redux'
import useStyles from './UpdateUserStyle'
import {makeStyles} from '@mui/styles'

export class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.useStyles = this.useStyles.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        password: this.props.user.password
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        password: this.props.user.password
      })
    }
  }

  useStyles = makeStyles({
    root: {
      marginTop: 60,

      background:
        'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',

      width: '100vw',
      height: '100vh',
      position: 'relative'
    },

    button: {
      textDecoration: 'none'
    },

    box: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 360,
      bottom: 350
    },

    textfield: {
      backgroundColor: 'white',
      borderRadius: '5px',
      width: 450
    },

    profile: {
      width: 450,
      position: 'absolute',
      top: 20
    }
  })

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  async handleSubmit() {
    await this.props.fetchUpdateUser({
      ...this.props.user,
      ...this.state
    })
  }

  render() {
    const classes = this.useStyles

    return (
      <div className={classes.root}>
        <h1>Update Profile</h1>
        <Box className={classes.box}>
          <div>
            <form className="flexCol" onSubmit={this.handleSubmit}>
              <Typography variant="h6" color="black">
                First Name
              </Typography>
              <TextField
                variant="outlined"
                required
                size="small"
                className={classes.textfield}
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />

              <div className="formGroup">
                <label className="formLabel">Last Name</label>
                <input
                  className="formControl"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Email</label>
                <input
                  className="formControl"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="formGroup">
                <label className="formLabel">Password</label>
                <input
                  className="formControl"
                  name="password"
                  type="password"
                  onChange={this.handleChange}
                />
              </div>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </Box>
      </div>
    )
  }
}
const mapState = state => {
  return {user: state.user}
}
const mapDispatch = dispatch => {
  return {
    fetchUpdateUser: state => {
      return dispatch(fetchUpdateUser(state))
    }
  }
}

export default connect(mapState, mapDispatch)(UpdateUser)

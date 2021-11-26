import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
  drawingPage: {
    marginTop: 60,

    // background:
    //   "linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)",

    color: 'white',
    position: 'relative',
    width: '100vw',
    height: '100vh'
  },

  button: {
    color: 'white',
    margin: 8
  },
  picker: {
    position: 'absolute',
    top: '0',
    right: 150
  }
})

export default useStyles

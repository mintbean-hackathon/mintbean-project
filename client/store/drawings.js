import axios from 'axios'

const SET_DRAWINGS = 'SET_DRAWINGS'
const CREATE_DRAWING = 'CREATE_DRAWING'
const DELETE_DRAWING = 'DELETE_DRAWING'
const UPDATE_DRAWING = 'UPDATE_DRAWING'

//action creator for SET_DRAWINGS
export const SetDrawings = drawings => {
  return {
    type: SET_DRAWINGS,
    drawings
  }
}

// thunk for SET_DRAWINGS
export const FetchDrawings = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/drawings')
      dispatch(SetDrawings(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// action creator for CREATE_DRAWING
export const CreateDrawing = drawing => {
  return {
    type: CREATE_DRAWING,
    drawing
  }
}

// thunk for CREATE_DRAWING
export const createNewDrawing = drawing => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/drawings', drawing)
      const newDrawing = response.data
      dispatch(createNewDrawing(newDrawing))
    } catch (error) {
      console.log(error)
    }
  }
}

//action creator for DELETE_DRAWING
export const deleteDrawing = drawing => {
  return {
    type: DELETE_DRAWING,
    drawing
  }
}

//thunk for DELETE_DRAWING
export const deleteDrawingThunk = drawing => {
  return async dispatch => {
    try {
      await axios.delete(`/api/drawings/${drawing.id}`)
      dispatch(deleteDrawing(drawing))
    } catch (error) {
      console.log(error)
    }
  }
}

//action creator for UPDATE_DRAWING

export const updateDrawing = drawing => {
  return {
    type: UPDATE_DRAWING,
    drawing
  }
}

//thunk for UPDATE_DRAWING
export const updateDrawingThunk = drawing => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/drawings/${drawing.id}`, drawing)
      console.log('this is Response==>', response)
      const updatedDrawing = response.data

      dispatch(updateDrawing(updatedDrawing))
      console.log('hello!!!!')
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = []

//reducer
export default function drawingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWINGS:
      return action.drawings
    case CREATE_DRAWING:
      return [...state, action.drawing]
    case DELETE_DRAWING:
      return state.filter(drawing => drawing.id !== action.drawing.id)
    case UPDATE_DRAWING:
      return state.map(drawing => {
        return drawing.id === action.drawing.id ? action.drawing : drawing
      })
    default:
      return state
  }
}

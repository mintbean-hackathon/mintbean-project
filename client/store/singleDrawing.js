import axios from 'axios'

const initialState = {}

const SET_SINGLE_DRAWING = 'SET_SINGLE_DRAWING'

export const setSingleDrawing = drawing => {
  return {
    type: SET_SINGLE_DRAWING,
    drawing
  }
}

export const fetchSingleDrawing = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/drawings/${id}`)

      dispatch(setSingleDrawing(data))
    } catch (err) {
      throw err
    }
  }
}

export default function singleDrawingReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_DRAWING:
      return action.drawing
    default:
      return state
  }
}

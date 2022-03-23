export const PICK_UP = 'PICK_UP'
export const CLEAR = 'CLEAR'

const initialState = {}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICK_UP:
      return action.payload
    case CLEAR:
      return action.payload
    default:
      break;
  }
  return state
}

export default alertReducer

const intialState = {
  user: {}
}

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case 'ADD_USER_INFO': return {
      ...state,
      user: action.payload
    }
    default:
      return state
  }
}

export default userReducer
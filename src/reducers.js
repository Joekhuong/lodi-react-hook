import {FETCH_DATA,RESET_DATA, LOGOUT_ACTION, LOGIN_ACTION} from './actions';

export const initialState = {
  data: "ABC",
  authenticated: false
}

const reducer = (state, action) => {
  const reduced = {...state};

  switch (action.type) {
    case FETCH_DATA:
      return {
        ...reduced,
        data: action.payload
      }
    case RESET_DATA:
      return initialState;
    case LOGIN_ACTION:
      return {
        ...reduced,
        authenticated: true
      }
    case LOGOUT_ACTION:
      return {
        ...reduced,
        authenticated: false
      }
    default:
      return state;
  }
}

export default reducer;

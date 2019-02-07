import {FETCH_DATA,RESET_DATA, LOGOUT_ACTION, LOGIN_ACTION, FETCH_REGION} from './actions';

export const initialState = {
  data: "ABC",
  authenticated: false,
  regions: []
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
        authenticated: true,
        ...action.payload
      }
    case LOGOUT_ACTION:
      return {
        ...reduced,
        authenticated: false,
        ...action.payload
      }
    case FETCH_REGION:
      return {
        ...reduced,
        regions: action.payload
      }
    default:
      return state;
  }
}

export default reducer;

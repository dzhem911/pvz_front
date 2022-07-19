const defaultState = {
  user: {},
}

const LOGIN_USER = 'LOGIN USER'
const LOGOUT_USER = 'LOGOUT USER'

export const userReducer = (state= defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {...state, user: {...state.user, ...action.payload, isAuth: true }}
    case LOGOUT_USER:
      return {...state, user: {isAuth: false}}
    default:
      return state
  }
}

export const loginUserAction = (payload) => ({type: LOGIN_USER, payload})
export const logoutUserAction = () => ({type: LOGOUT_USER})
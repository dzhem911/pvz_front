const SHOWING_REG_MODAL = 'SHOWING_REG_MODAL'
const HIDE_REG_MODAL = 'HIDE_REG_MODAL'
const SHOW_SIGNIN_MODAL = 'SHOW_SIGNIN_MODAL'
const HIDE_SIGNIN_MODAL = 'HIDE_SIGNIN_MODAL'
const SHOW_RES_PW_MODAL = 'SHOW_RES_PW_MODAL'
const HIDE_RES_PW_MODAL = 'HIDE_RES_PW_MODAL'

const initialValues = {
  registrationModal: false,
  signInModal: false,
  resPasswordModal: false,
}

export const modalReducer = (state=initialValues, action) => {
  switch (action.type) {
    case SHOWING_REG_MODAL:
      return {...state, registrationModal: true}
    case HIDE_REG_MODAL:
      return {...state, registrationModal: false}
    case SHOW_SIGNIN_MODAL:
      return {...state, signInModal: true}
    case HIDE_SIGNIN_MODAL:
      return {...state, signInModal: false}
    case SHOW_RES_PW_MODAL:
      return {...state, resPasswordModal: true}
    case HIDE_RES_PW_MODAL:
      return {...state, resPasswordModal: false}
    default:
      return state
  }
}

export const showingRegModalAction = () => ({type: SHOWING_REG_MODAL})
export const hideRegModalAction = () => ({type: HIDE_REG_MODAL})
export const showingSignInModalAction = () => ({type: SHOW_SIGNIN_MODAL})
export const hideSignInModalAction = () => ({type: HIDE_SIGNIN_MODAL})
export const showingResPasModalAction = () => ({type: SHOW_RES_PW_MODAL})
export const hideResPasModalAction = () => ({type: HIDE_RES_PW_MODAL})
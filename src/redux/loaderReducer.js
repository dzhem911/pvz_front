
const LOADER_ON = 'LOADER_ON'
const LOADER_OFF = 'LOADER_OFF'

export const loaderReducer = (state=false, action) => {
  switch (action.type) {
    case LOADER_ON:
      return state
    case LOADER_OFF:
      return !state
    default:
      return state
  }
}

export const turnOnLoaderAction = () => ({type: LOADER_ON})
export const turnOffLoaderAction = () => ({type: LOADER_OFF})
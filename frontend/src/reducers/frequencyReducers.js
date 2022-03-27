import { FREQUENCY_LIST_FAIL, FREQUENCY_LIST_REQUEST, FREQUENCY_LIST_SUCCESS, FREQUENCY_LIST_RESET,
         FREQUENCY_CREATE_REQUEST, FREQUENCY_CREATE_SUCCESS, FREQUENCY_CREATE_FAIL, FREQUENCY_CREATE_RESET,
         FREQUENCY_DETAILS_FAIL, FREQUENCY_DETAILS_REQUEST, FREQUENCY_DETAILS_SUCCESS, FREQUENCY_DETAILS_RESET,
         FREQUENCY_UPDATE_REQUEST, FREQUENCY_UPDATE_SUCCESS, FREQUENCY_UPDATE_FAIL, FREQUENCY_UPDATE_RESET,
         FREQUENCY_DELETE_REQUEST,FREQUENCY_DELETE_SUCCESS, FREQUENCY_DELETE_FAIL,
	} from '../constants/frequencyConstants'


export const frequencyListReducer = (state = { frequencies:[] }, action) => {
  switch (action.type) {
    case FREQUENCY_LIST_REQUEST:
      return { loading: true, frequencies:[] }
    case FREQUENCY_LIST_SUCCESS:
      return { loading: false,  frequencies: action.payload }
    case FREQUENCY_LIST_FAIL:
      return { loading: false, error: action.payload }
    case FREQUENCY_LIST_RESET:
      return { frequencies: [] }
    default:
      return state
  }
}

export const frequencyCreateReducer = (state={}, action) => {
  switch(action.type){
    case FREQUENCY_CREATE_REQUEST:
      return { loading: true }
    case FREQUENCY_CREATE_SUCCESS:
      return { loading: false, success: true, frequency: action.payload }
    case FREQUENCY_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case FREQUENCY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const frequencyDetailsReducer = (state = { frequency: {} }, action) => {
  switch (action.type) {
    case FREQUENCY_DETAILS_REQUEST:
      return { ...state, loading: true }
    case FREQUENCY_DETAILS_SUCCESS:
      return { loading: false, frequency: action.payload }
    case FREQUENCY_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case FREQUENCY_DETAILS_RESET:
      return { frequency:{} }
    default:
      return state
  }
}


export const frequencyUpdateReducer = (state = { frequency: {} }, action) => {
  switch (action.type) {
    case FREQUENCY_UPDATE_REQUEST:
      return { loading: true }
    case FREQUENCY_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case FREQUENCY_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case FREQUENCY_UPDATE_RESET:
      return {
        frequency: {} 
      }
    default:
      return state
  }
}

export const frequencyDeleteReducer = (state = {}, action) => {
  switch(action.type) {
    case FREQUENCY_DELETE_REQUEST:
      return { loading:true }
    case FREQUENCY_DELETE_SUCCESS:
      return { loading:false, success: true }
    case FREQUENCY_DELETE_FAIL:
      return { loading:false, error: action.payload }
    default:
      return state
  }
}
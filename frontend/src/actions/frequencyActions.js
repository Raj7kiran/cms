import axios from 'axios'
import { FREQUENCY_LIST_FAIL, FREQUENCY_LIST_REQUEST, FREQUENCY_LIST_SUCCESS, FREQUENCY_LIST_RESET,
         FREQUENCY_CREATE_REQUEST, FREQUENCY_CREATE_SUCCESS, FREQUENCY_CREATE_FAIL, FREQUENCY_CREATE_RESET,
         FREQUENCY_DETAILS_FAIL, FREQUENCY_DETAILS_REQUEST, FREQUENCY_DETAILS_SUCCESS, FREQUENCY_DETAILS_RESET,
         FREQUENCY_UPDATE_REQUEST, FREQUENCY_UPDATE_SUCCESS, FREQUENCY_UPDATE_FAIL, FREQUENCY_UPDATE_RESET,
         FREQUENCY_DELETE_REQUEST,FREQUENCY_DELETE_SUCCESS, FREQUENCY_DELETE_FAIL,
	} from '../constants/frequencyConstants'
import { logout } from './userActions'


export const listFrequency = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FREQUENCY_LIST_REQUEST,
    })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {                 
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.get(`/frequency`, config)    

    dispatch({
      type: FREQUENCY_LIST_SUCCESS,
      payload: data,
    })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FREQUENCY_LIST_FAIL,
      payload: message,
    })
  }
}


export const createFrequency = (frequency) => async(dispatch, getState) => {
  
  try{
    dispatch({ type: FREQUENCY_CREATE_REQUEST })

    const { userLogin:{ userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post('/frequency', frequency, config)

    dispatch({
      type: FREQUENCY_CREATE_SUCCESS,
      payload: data
    })

  } catch(error){
    const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          
          dispatch({
            type: FREQUENCY_CREATE_FAIL,
            payload: message,
          })
  }
}


export const getFrequencyDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FREQUENCY_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

								  
    const config = {
			      headers: {								 
			         Authorization: `Bearer ${userInfo.token}`,
		     	 },
   			 }	

    const { data } = await axios.get(`/frequency/${id}`, config)	  

    dispatch({
      type: FREQUENCY_DETAILS_SUCCESS,
      payload: data,
    })
 		
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FREQUENCY_DETAILS_FAIL,
      payload: message,
    })
  }
}


export const updateFrequency = (frequency) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FREQUENCY_UPDATE_REQUEST,
    })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {    
         'Content-Type': 'application/json',             
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.put(`/frequency/${frequency.id}`, frequency,config)   

    dispatch({ type: FREQUENCY_UPDATE_SUCCESS, })
    dispatch({ type: FREQUENCY_DETAILS_SUCCESS, payload: data })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FREQUENCY_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const deleteFrequency = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FREQUENCY_DELETE_REQUEST
    })

    const { userLogin: {userInfo}, } = getState()

    const config = {
      headers : { Authorization: `Bearer ${userInfo.token}` }, 
    }

    await axios.delete(`/frequency/${id}`, config)

    dispatch({
      type: FREQUENCY_DELETE_SUCCESS,
    })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, please login again!') {
      dispatch(logout())
    }
    dispatch({
      type: FREQUENCY_DELETE_FAIL,
      payload: message,
    })
  }
}
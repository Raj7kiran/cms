import axios from 'axios'
import { SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_LIST_RESET,
         SERVICE_CREATE_REQUEST, SERVICE_CREATE_SUCCESS, SERVICE_CREATE_FAIL, SERVICE_CREATE_RESET,
         SERVICE_DETAILS_FAIL, SERVICE_DETAILS_REQUEST, SERVICE_DETAILS_SUCCESS, SERVICE_DETAILS_RESET,
         SERVICE_UPDATE_REQUEST, SERVICE_UPDATE_SUCCESS, SERVICE_UPDATE_FAIL, SERVICE_UPDATE_RESET,
         SERVICE_DELETE_REQUEST,SERVICE_DELETE_SUCCESS, SERVICE_DELETE_FAIL,
	} from '../constants/serviceConstants'
import { logout } from './userActions'


export const listServices = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_LIST_REQUEST,
    })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {                 
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.get(`/service`, config)    

    dispatch({
      type: SERVICE_LIST_SUCCESS,
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
      type: SERVICE_LIST_FAIL,
      payload: message,
    })
  }
}


export const createService = (service) => async(dispatch, getState) => {
  
  try{
    dispatch({ type: SERVICE_CREATE_REQUEST })

    const { userLogin:{ userInfo } } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post('/service', service, config)

    dispatch({
      type: SERVICE_CREATE_SUCCESS,
      payload: data
    })

  } catch(error){
    const message =
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message
          
          dispatch({
            type: SERVICE_CREATE_FAIL,
            payload: message,
          })
  }
}


export const getServiceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_DETAILS_REQUEST,
    })

    const { userLogin: { userInfo }} = getState()

								  
    const config = {
			      headers: {								 
			         Authorization: `Bearer ${userInfo.token}`,
		     	 },
   			 }	

    const { data } = await axios.get(`/service/${id}`, config)	  

    dispatch({
      type: SERVICE_DETAILS_SUCCESS,
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
      type: SERVICE_DETAILS_FAIL,
      payload: message,
    })
  }
}


export const updateService = (service) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_UPDATE_REQUEST,
    })

    const { userLogin: { userInfo }, } = getState()
                  
    const config = {
      headers: {    
         'Content-Type': 'application/json',             
         Authorization: `Bearer ${userInfo.token}`,
      },
    } 

    const { data } = await axios.put(`/service/${service.id}`, service,config)   

    dispatch({ type: SERVICE_UPDATE_SUCCESS, })
    dispatch({ type: SERVICE_DETAILS_SUCCESS, payload: data })
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SERVICE_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const deleteService = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SERVICE_DELETE_REQUEST
    })

    // const { userLogin: {userInfo}, } = getState()

    // const config = {
    //   headers : { Authorization: `Bearer ${userInfo.token}` }, 
    // }

    await axios.delete(`/service/${id}`)

    dispatch({
      type: SERVICE_DELETE_SUCCESS,
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
      type: SERVICE_DELETE_FAIL,
      payload: message,
    })
  }
}
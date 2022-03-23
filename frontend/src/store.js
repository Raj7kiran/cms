import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userListReducer, userDeleteReducer, userCreateReducer } from './reducers/userReducers'
import { countryListReducer, stateListReducer, cityListReducer } from './reducers/dropReducers'
import { packageListReducer, packageCreateReducer, packageDeleteReducer } from './reducers/adminReducers'
import { serviceListReducer, serviceCreateReducer, serviceDeleteReducer, serviceUpdateReducer, serviceDetailsReducer } from './reducers/serviceReducers'



const reducer = combineReducers({
	userLogin: userLoginReducer,
	userList: userListReducer,
	userDelete:userDeleteReducer,
	countryList: countryListReducer,
	stateList: stateListReducer,
	cityList: cityListReducer,
	packageList: packageListReducer,
	packageCreate: packageCreateReducer,
	packageDelete:packageDeleteReducer,
	userCreate:userCreateReducer,
	serviceList: serviceListReducer,
	serviceCreate: serviceCreateReducer,
	serviceDetails: serviceDetailsReducer,
	serviceUpdate: serviceUpdateReducer,
	serviceDelete: serviceDeleteReducer,
})


const userInfoFromStorage = localStorage.getItem('userInfo')
							 ? JSON.parse(localStorage.getItem('userInfo'))
							 : null


const initialState ={ userLogin: { userInfo: userInfoFromStorage } }

const middleware =[thunk]

const store = createStore(
		reducer,
		initialState,
		composeWithDevTools(applyMiddleware(...middleware))
	)


export default store
import { PACKAGE_LIST_REQUEST,PACKAGE_LIST_SUCCESS, PACKAGE_LIST_FAIL,
		 		 PACKAGE_CREATE_REQUEST,PACKAGE_CREATE_SUCCESS, PACKAGE_CREATE_FAIL, PACKAGE_CREATE_RESET,
		 		 PACKAGE_DELETE_REQUEST,PACKAGE_DELETE_SUCCESS, PACKAGE_DELETE_FAIL
		} from '../constants/adminConstants'


export const packageListReducer = (state = { packages: [] }, action) => {
	switch(action.type) {
		case PACKAGE_LIST_REQUEST:
			return { loading:true, packages: [] }
		case PACKAGE_LIST_SUCCESS:
			return { loading:false, packages: action.payload, success:true }
		case PACKAGE_LIST_FAIL:
			return { loading:false, error: action.payload }
		default:
			return state
	}
}

export const packageCreateReducer = (state = {}, action) => {
	switch(action.type) {
		case PACKAGE_CREATE_REQUEST:
			return { loading:true }
		case PACKAGE_CREATE_SUCCESS:
			return { loading:false, success: true, package: action.payload }
		case PACKAGE_CREATE_FAIL:
			return { loading:false, error: action.payload }
		case PACKAGE_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const packageDeleteReducer = (state = {}, action) => {
	switch(action.type) {
		case PACKAGE_DELETE_REQUEST:
			return { loading:true }
		case PACKAGE_DELETE_SUCCESS:
			return { loading:false, success: true }
		case PACKAGE_DELETE_FAIL:
			return { loading:false, error: action.payload }
		default:
			return state
	}
}

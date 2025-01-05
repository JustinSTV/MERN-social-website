import { UserState, UserActionTypes } from "../../types/UserTypes";
import { initialState } from "../../types/UserTypes";

const userReducer = (state: UserState, action: UserActionTypes): UserState => {
  switch(action.type){
    case 'LOGIN_START':
    case 'REGISTER_START':
      return{
        ...state,
        loading: true,
        error: null
      };
    
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return{
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        loading: false,
        error: null,
        success: action.payload.message
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return{
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'LOGOUT': 
      localStorage.removeItem('token');
      return{ 
        ...initialState 
      };
    
    case 'UPDATE_USER':
      return{
        ...state,
        user: action.payload
      };
    
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default userReducer;
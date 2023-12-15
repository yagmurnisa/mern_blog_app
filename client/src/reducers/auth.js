import { AUTH_ERROR, LOGIN, LOGOUT, REGISTER, USER_LOADED } from '../actions/types';

const initialState = {
    user: null,
    authenticated: false,
    error: null,
    loading: true,
    
}
export default function (state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN:
            return{
                ...state,
                user: payload.user,
                authenticated: true,   
                loading: false,
            };
        case REGISTER:
            return {
                ...state,
                user:payload.user,
                authenticated: true,
            };
        case USER_LOADED:
            return {
                ...state,
                user:payload,
                authenticated: true,
                loading: false,
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: payload,
            };
        case LOGOUT:
            return {
                ...state,
                user: null,
                authenticated: false
            };
        /*case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }*/
        default:
            return state;
    }
}
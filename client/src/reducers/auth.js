import { LOGIN, LOGOUT, REGISTER, USER_LOADED } from '../actions/types';

const initialState = {
    user: null,
    authenticated: false,
}
export default function (state=initialState, action){
    const {type, payload} = action;
    switch(type){
        case LOGIN:
            return{
                ...state,
                user: payload.user,
                authenticated: true,   
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
                user:payload.user,
                authenticated: true,
            }
        default:
            return state;
    }
}
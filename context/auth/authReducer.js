import {SUCCESSFUL_REGISTRATION,
        ERROR_REGISTRATION,
        CLEAR_ALERT,
        SUCCESSFUL_LOGIN,
        ERROR_LOGIN,
        USER_AUTH,
        LOG_OUT } from '../../types';


export default (state, action) => {

    switch(action.type) {
        case SUCCESSFUL_REGISTRATION:
        case ERROR_REGISTRATION:
        case ERROR_LOGIN:
            return{
                ...state,
                message: action.payload,
            }
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload)
            return{
                ...state,
                token: action.payload,
                auth:true
            }
        case CLEAR_ALERT:
            return {
                ...state,
                message: null
            }
        case USER_AUTH:
            return{
                ...state,
                user: action.payload,
                auth: true
            }
        case LOG_OUT:
            localStorage.removeItem('token');
            return{
                ...state,
                user:null,
                token:null,
                auth:null,

            }
        
        default:
            return state;
    }
}
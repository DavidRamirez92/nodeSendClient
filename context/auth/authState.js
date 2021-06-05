import authContext from './authContext';
import React, {useReducer} from 'react';
import authReducer from './authReducer';

import {SUCCESSFUL_REGISTRATION,
        ERROR_REGISTRATION,
        CLEAR_ALERT} from '../../types';

import clientAxios from '../../config/axios';

const AuthState = ({children}) => {
     //initial State
    const initialState = {
        token: '',
        auth: null,
        user: null,
        message: null
    }
     //define reducer
    const [state, dispatch ] = useReducer(authReducer, initialState );

    //Register new users
    const registerUser = async data => {
        try {
            const answer = await clientAxios.post('/api/users', data );
            console.log(answer.data.msg);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: answer.data.msg
            });
           
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: ERROR_REGISTRATION,
                payload: error.response.data.msg

            })
        }

         //Clear alert after 3 seg
         setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            })
        },3000);
    }

    //user auth
    const userAuth = name => {
        dispatch({
            type: USER_AUTH,
            payload: name
        })
    }
    return(
        <authContext.Provider
            value={{
               token: state.token,
               auth: state.auth,
               user: state.user,
               message: state.message,
               registerUser,
               userAuth
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
import authContext from './authContext';
import React, {useReducer} from 'react';
import authReducer from './authReducer';

import {SUCCESSFUL_REGISTRATION,
        ERROR_REGISTRATION,
        CLEAR_ALERT,
        SUCCESSFUL_LOGIN,
        ERROR_LOGIN,
        USER_AUTH,
        LOG_OUT } from '../../types';

import clientAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = ({children}) => {
     //initial State
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
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

    //Auth Users
    const logIn = async data => {
       
        try {
            const answer = await clientAxios.post('/api/auth',data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: answer.data.token
            })
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN,
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

    //Return auth User acccording to JWT
    const userAuth = async () => {
        const token =localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const answer = await clientAxios.get('/api/auth');
            if(answer.data.user){
                dispatch({
                    type: USER_AUTH,
                    payload:answer.data.user
                })
            }
           
        } catch (error) {
            dispatch({
                type: ERROR_LOGIN,
                payload: error.response.data.msg
            })
        }
    }

    //Log out
    const logOut = () => {
        dispatch({
            type: LOG_OUT
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
               userAuth,
               logIn,
               logOut
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState;
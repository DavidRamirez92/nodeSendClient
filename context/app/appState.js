import React,{useReducer} from 'react';
import appContext from './appContext';
import appReducer from './appReducer';
import{
    SHOW_ALERT,
    CLEAR_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CLEAN_STATE
} from '../../types';
import clientAxios from '../../config/axios';

const AppState = ({children}) => {

    const initialState = {
        message_file: null,
        name: '',
        original_name: '',
        charging: null,
        download: 1,
        password: '',
        auth: null,
        url: ''

    }

    //define reducer
    const [state, dispatch] = useReducer(appReducer, initialState);

    const showAlert = msg => {
        dispatch({
            type: SHOW_ALERT,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT
            })
        }, 3000);
    }

    const uploadFile = async (formData, fileName) => {

        dispatch({
            type: UPLOAD_FILE
        })
    
        try {
            const answer = await clientAxios.post('/api/files',formData);
            console.log(answer.data);
    
           dispatch({
               type: UPLOAD_FILES_SUCCESS,
               payload: {
                   name : answer.data.file,
                   original_name : fileName
               }
           })
    
           
        } catch (error) {
            console.log(error);
            dispatch({
                type: UPLOAD_FILES_ERROR,
                payload: error.response.data.msg
            })
        }
    }  

    const createLink = async () => {
        const data = {
            name: state.name,
            original_name: state.original_name,
            download: state.download,
            password: state.password,
            auth: state.auth
        }

        try {
            const answer = await clientAxios.post('/api/links', data);
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: answer.data.msg
            });
        } catch (error) {
            console.log(error);
        }
    }

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE
        })
    }

    return(
        <appContext.Provider
            value={{
                message_file : state.message_file,
                name : state.name,
                original_name : state.original_name,
                charging: state.charging,
                download: state.download,
                password: state.password,
                auth: state.auth,
                url: state.url,
                showAlert,
                uploadFile,
                createLink,
                cleanState
            }}
        >
            {children}
        </appContext.Provider>
    )
    //Upload files to server
     
}



export default AppState
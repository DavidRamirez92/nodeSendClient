import{
    SHOW_ALERT,
    CLEAR_ALERT,
    UPLOAD_FILE,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_ERROR,
    CREATE_LINK_SUCCESS,
    CREATE_LINK_ERROR,
    CLEAN_STATE,
    ADD_PASSWORD,
    ADD_DOWNLOADS
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case SHOW_ALERT:
            return{
                ...state,
                message_file : action.payload
            }
        case CLEAR_ALERT:
            return{
                ...state,
                message_file : null
            }
        case UPLOAD_FILE:
            return {
                ...state,
                charging: true,
            }
        case UPLOAD_FILES_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                original_name: action.payload.original_name,
                charging: null,
            }
        case UPLOAD_FILES_ERROR:
            return{
                ...state,
                message_file: action.payload,
                charging:null,
            }
        case CREATE_LINK_SUCCESS:
            return{
                ...state,
                url: action.payload
            }

        case CLEAN_STATE:
            return{
                ...state,
                message_file: null,
                name: '',
                original_name: '',
                charging: null,
                download: 1,
                password: '',
                auth: null,
                url: ''
                 }
        case ADD_PASSWORD:
            return{
                ...state,
                password: action.payload
            }
        case ADD_DOWNLOADS:
            return {
                ...state,
                download: action.payload
            }

        default:
            return state
    }
}
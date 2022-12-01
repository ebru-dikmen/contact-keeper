import React, { useReducer } from "react";
import axios from 'axios';
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {

    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

} from "../types";
const AuthState = (props) => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);
    //Load User

    const loadUser = ()=>{
        if (localStorage.token) {
            setAuthToken(localStorage.token)
            
        }
        try {
            const res = axios.get('/api/auth');
            dispatch({
                type:USER_LOADED,
                payload:res.data
            });
        } catch (error) {
            dispatch({type:AUTH_ERROR});
            
        }
    };
    //Register User
    const register = async formData => {
        debugger;
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            });
        }
    }
    //Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = axios.post('/api/auth', formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg
            });
        }
    }
    //Logout
    const logout = ()=>console.log('Logout');
    //Clean errors
    const clearErrors = ()=>dispatch({type:CLEAR_ERRORS});
    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}
export default AuthState;
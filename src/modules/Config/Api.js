/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import Cookies from 'js-cookie';
import { HTTP_URL } from './Http';

// Token 

const setToken = (token) => {
    Cookies.set('session_token',token,{expires: 1,secure:true,Priority:'High'});
}

const getToken = () => {
    return Cookies.get('session_token') ?? null;
}

const deleteToken = () => {
    Cookies.remove('session_token');
}

// setAdmin 

const setAdmin = (id) => {
    Cookies.set('ID_ADMIN',id,{expires: 1,secure:true,Priority:'High'});
}

const getAdmin = () => {
    return Cookies.get('ID_ADMIN') ?? null;
}

const deleteAdmin = () => {
    Cookies.remove('ID_ADMIN');
}


// Api Poll

const ApiFetchPoll = async (token) => {
    const ApiPoll = await axios.get((HTTP_URL + 'poll'),{   
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        return error.response;
    })
    return ApiPoll
};

const ApiAddPoll = async (title,description,deadline,choices,token) => {
    const ApiPoll = await axios.post((HTTP_URL + 'poll'),{
        title:title,
        description:description,
        deadline:deadline,
        choices:choices
    },{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response;
    })
    return ApiPoll
};

const ApiFetchPollById = async (id,token) =>{
    const ApiPoll = await axios.get((HTTP_URL + `poll/${id}`),{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response;
    })
    return ApiPoll
}

const ApiDeletePoll = async (id,token) => {
    const ApiPoll = await axios.delete((HTTP_URL + 'poll/' +id),{
        headers:{
            Authorization:`Bearer ${token}`,
        }
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response;
    })
    return ApiPoll
}

const ApiVote = async (poll_id,choice_id,token) =>{
    const ApiPoll = await axios.post((HTTP_URL + 'poll/' + poll_id + '/vote/' + choice_id),{},{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    .then((response) => {
        return response
    })
    .catch((error) => {
        return error.response
    })
    return ApiPoll
}

// Api Authentication

const AuthLogin = async (username,password) =>{
    const ApiAuth = await axios.post((HTTP_URL + 'auth/login'),{
        username:username,
        password:password,
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response;
    })
    return ApiAuth
}

const AuthRegister = async (username,password,password_confirm,role,divisions) => {
    const ApiAuth = await axios.post((HTTP_URL + 'auth/register'),{
        username:username,
        password:password,
        password_confirmation:password_confirm,
        role:role,
        divisions:divisions
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response;
    })
    return ApiAuth
}

const AuthLogout = async (token) =>{
    const ApiAuth = await axios.post((HTTP_URL + 'auth/logout'),{},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        return error.response;
    })
    return ApiAuth
}

export {ApiFetchPoll,ApiAddPoll,ApiFetchPollById,ApiDeletePoll,AuthLogin,AuthRegister,AuthLogout,getToken,setToken,setAdmin,getAdmin,deleteToken,deleteAdmin,ApiVote};
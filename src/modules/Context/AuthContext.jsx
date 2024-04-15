/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthLogin, AuthLogout, AuthRegister, deleteAdmin, deleteToken, getAdmin, getToken, setAdmin, setToken } from "../Config/Api.js";
import Swal from "sweetalert2";


const InitContext = createContext({
    isLoggedin: false,
    isAdmin: null,
    doLogin: () => {},
    doRegister: () => {},
    doLogout: () => {},
});

const useAuth = () => {
    return useContext(InitContext);
}

const AuthProvider = ({children}) => {
    const [isLoggedin,setIsLoggedIn] = useState(false);
    const [isAdmin,setIsAdmin] = useState(null);
    useEffect(() => {
        const token = getToken();
        const adminId = getAdmin();
        if(token !== null){
            setIsLoggedIn(true);
            if(adminId > 0){
                setIsAdmin(adminId);
            }else{
                setIsAdmin(0);
            }
        }
    },[]);

    const doLogin = async (name,pass,setValue) => {
        const data = await AuthLogin(name,pass);
        if(data.status === 200){
        const adminId = data.data.message.User.is_admin;
        Swal.fire({
            title: 'Login Berhasil',
            icon: 'success',
            showConfirmButton:false,
            timer:1000
        });

        return setTimeout(() => {
            setIsLoggedIn(true); 
        if(adminId > 0){
            setAdmin(adminId);
            setIsAdmin(adminId)
        }else{
            setIsAdmin(adminId)
            setAdmin(adminId);
        }
        setToken(data.data.message.Token);
        setValue(); 
        },1000);

        }
        const {username = [], password = []} = data.data;
        const errors = [...username,...password];
        if(data.status !== 404){
            return Swal.fire({
                title: errors.join("\n"),
                icon: 'error',
                showConfirmButton:false,
                timer:1000
            });
        }
        return Swal.fire({
            title:  data.data,
            icon: 'error',
            showConfirmButton:false,
            timer:1000
        });
    }

    const doRegister = async (name,pass,password_confirm,roles,division,removeVal) => {
        const data = await AuthRegister(name,pass,password_confirm,roles,division);
        if(data.status === 201){
            Swal.fire({
                title:"Berhasil Registrasi Silahkan Login",
                icon:'success',
                showConfirmButton:false,
                timer:1000,
            }); 
           return setTimeout(() => {
                removeVal()
            },1000);
        }
        if(data.status !== 401){
            return Swal.fire({
                title:data.data.message.User,
                icon:'error',
                showConfirmButton:false,
                timer:1000,
            }); 
        }
        const {username = [],password = [], role = [], divisions = []} = data.data;
        const error = [...username,...password,...role,...divisions]
        return Swal.fire({
            title: error.join("\n"),
            icon:'error',
            showConfirmButton:false,
            timer:2000
        });
    }

    const doLogout = async () => {
        const token = getToken();
        const data = await AuthLogout(token);
        if(data.status === 200){
            Swal.fire({
                title: "Berhasil Logout",
                icon: 'success',
                showConfirmButton:false,
                timer:1000
            });    
            
            setTimeout(() => {
                setIsLoggedIn(false);
                deleteToken();
                deleteAdmin();
            },1000);
        }
    }

    return(
        <InitContext.Provider value={{
            isLoggedin,
            isAdmin,
            doLogin,
            doRegister,
            doLogout,
        }}>
            {children}
        </InitContext.Provider>
    );
}

export {useAuth,AuthProvider}
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthLogin, AuthLogout, AuthRegister, getToken, setToken } from "../Config/Api.js";
import Swal from "sweetalert2";


const InitContext = createContext({
    isLoggedin: false,
    doLogin: () => {},
    doRegister: () => {},
    doLogout: () => {},
});

const useAuth = () => {
    return useContext(InitContext);
}

const AuthProvider = ({children}) => {
    const [isLoggedin,setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        if(token !== null){
            setIsLoggedIn(true);
        }
    },[]);

    const doLogin = async (name,pass,setValue) => {
        const data = await AuthLogin(name,pass);
        if(data.status === 200){
        setIsLoggedIn(true);
        setToken(data.data.message.Token);
        setValue(); 
        return Swal.fire({
            title: 'Login Berhasil',
            icon: 'success',
            showConfirmButton:false,
            timer:1000
        });
        }
        const {username = [], password = []} = data.data;
        const error = [...username,...password];
        return Swal.fire({
            title: error.join("\n"),
            icon: 'error',
            showConfirmButton:false,
            timer:1000
        });
    }

    const doRegister = async (username,password,password_confirm,role,divisions) => {
        const data = await AuthRegister(username,password,password_confirm,role,divisions);
        console.log(data);
    }

    const doLogout = async () => {
        const data = await AuthLogout(isLoggedin);
        console.log(data);
    }

    return(
        <InitContext.Provider value={{
            isLoggedin,
            doLogin,
            doRegister,
            doLogout,
        }}>
            {children}
        </InitContext.Provider>
    );
}

export {useAuth,AuthProvider}
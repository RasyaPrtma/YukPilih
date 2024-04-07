import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    // Hooks
    const { doLogin } = useAuth();

    const setValue = () => {
        setName("");
        setPass("");
    }

    const handleClick = () => {
        doLogin(name, pass,setValue);
    }

    const showPassword = () => {
        document.getElementById('show').style.display = 'none';
        document.getElementById('pass').setAttribute('type','text');
        document.getElementById('hide').style.display = 'block';
    }

    const hidePassword = () => {
        document.getElementById('hide').style.display = 'none';
        document.getElementById('show').style.display = 'block';
        document.getElementById('pass').setAttribute('type','password');
    }

    return (
        <>
            <h1 className="text-white font-bold text-[2rem]">Login</h1>
           <div className="name">
            <h3>Username</h3>
           <div className="wrap">
                <i className="fa-solid fa-user"></i>
                <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
           </div>
            <div className="password">
                <h3>Password</h3>
                <div className="wrap">
                <i className="fa-solid fa-lock"></i>
                <div className="visible">
                    <div className="wrapper-visb absolute right-10">
                        <a id="show"  onClick={showPassword} className="cursor-pointer"><i className="fa-solid fa-eye"></i></a>
                        <a id="hide" onClick={hidePassword} className="cursor-pointer" hidden><i className="fa-solid fa-eye-slash"></i></a>
                    </div>
                    <input id="pass" className="input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} />
                </div>
            </div>
            </div>
            <button className="btn" onClick={handleClick}>Submit</button>
            <div className="signup">
            <p className="text-[#313131]">Don{"'"}t have accout? <Link to={"/register"} className="text-[#f9f9f985]">Sign Up</Link></p>
            </div>
        </>
    );
}
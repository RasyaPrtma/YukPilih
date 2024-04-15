import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function Register(){
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [role,setRole] = useState("");
    const [divisions,setDivisions] = useState("");

    const {doRegister} = useAuth();

    const removeVal = () => {
        setName("");
        setPass("");
        setPassConfirm("");
        setRole("");
        setDivisions("");
    }

    const handleClick = () => {
        doRegister(name,pass,passConfirm,role,divisions,removeVal);
    }

    const showPassword = () => {
        document.getElementById('show').style.display = 'none';
        document.getElementById('pass').setAttribute('type','text');
        return document.getElementById('hide').style.display = 'block';
    }

    const hidePassword = () => {
        document.getElementById('hide').style.display = 'none';
        document.getElementById('show').style.display = 'block';
        document.getElementById('pass').setAttribute('type','password');
    }
    return(
        <>
            <h1 className="text-white font-bold text-[2rem]">Register</h1>
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
            <div className="password">
                <h3>Password Confirmation</h3>
                <div className="wrap">
                <i className="fa-solid fa-lock"></i>
                <input id="pass_confirm" className="input" type="password" value={passConfirm} onChange={(e) => setPassConfirm(e.target.value)} />
            </div>
            </div>
            <div className="role">
                <h3>Role</h3>
                <div className="wrap">
                    <i className="fa-solid fa-id-badge"></i>
                    <input value={role} onChange={(e) => setRole(e.target.value)} type="text" className="input"/>
                </div>
            </div>
            <div className="divisions">
                <h3>Divisions</h3>
                <div className="wrap">
                <i className="fa-solid fa-user-gear"></i>
                <select value={divisions} onChange={(e) => setDivisions(e.target.value)} className="input">
                    <option value="1">Web Developer</option>
                    <option value="2">BackEnd Developer</option>
                    <option value="3">CMS Developer</option>
                </select>
                </div>
            </div>
            <button className="btn" onClick={handleClick}>Submit</button>
            <div className="signup">
            <p className="text-[#313131]">Did{"'"}have accout? <Link to={"/login"} className="text-[#f9f9f985]">Sign In</Link></p>
            </div>
        </>
    );
}
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";

export default function NavbarLayout(){
    const {doLogout} = useAuth();
    const handleClick = () =>{
        Swal.fire({
            title:"Anda Ingin Logout?",
            icon:'question',
            showCancelButton:true,
            confirmButtonColor:"lightgreen",
            cancelButtonColor:"red",
            confirmButtonText: "Logout",
        }).then((result) => {
            if(result.isConfirmed){
                doLogout()
            }
        });
    }
    return(
        <>
        <div>
            <Link onClick={handleClick}>Logout</Link>
        </div>
        <Outlet/>
        </>
    );
}
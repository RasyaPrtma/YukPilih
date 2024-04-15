import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Swal from "sweetalert2";

export default function NavbarLayout(){
    const {doLogout,isAdmin} = useAuth();
    const handleLogout = () =>{
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
        <div className="navbar">
            {isAdmin > 0 ? 
                <>
                    <h1>DASHBOARD</h1>
                <nav className="navigation">
                    <Link to={"/poll"}>Poll</Link>
                    <Link to={"/vote/result"}>Result Vote</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                </nav>
                </>
             :
                <>
                    <h1>YukPilih</h1>
                <nav className="navigation">
                    <Link to={"/vote"}>Vote</Link>
                    <Link to={"/vote/result"}>Result Vote</Link>
                    <Link onClick={handleLogout}>Logout</Link>
                </nav>
                </>
             }
        </div>
        <Outlet/>
        </>
    );
}
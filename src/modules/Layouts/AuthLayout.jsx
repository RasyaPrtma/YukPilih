import { Outlet } from "react-router-dom";

export default function AuthLayout(){
    return(
        <>
            <div className="px-[2rem] py-[2rem] mx-auto my-[7rem] flex flex-col w-[400px] h-auto items-center justify-center bg-[#a09d9d] gap-4 rounded-md">
                <Outlet/>
            </div>
        </>
    );
}
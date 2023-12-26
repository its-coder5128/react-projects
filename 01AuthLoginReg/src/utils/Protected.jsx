import React, { useEffect } from "react";
import { Outlet,useNavigate} from 'react-router-dom'
import { useAuth } from "./AuthContext"

function Protected(){
    const {user} = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user)
            navigate("/login")
        else
            navigate("/")
    },[user])
    return(
        <div className=" w-full">
            <Outlet/>
        </div>
    );
}

export default Protected
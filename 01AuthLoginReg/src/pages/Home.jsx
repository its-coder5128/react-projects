import React, { useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Home(){
    const {user,handleLogout} = useAuth()
    const navigate = useNavigate()

    return(
        <div>
            <h1>
                Home {user?.name}
            </h1>
            <button onClick={handleLogout}>LOGOUT</button>
        </div>
    );
}

export default Home
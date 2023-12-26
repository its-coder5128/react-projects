import React from "react";
import { Link } from "react-router-dom";

function Header(){
    
    return(
        <div className=" w-full">
        <Link to="/">home </Link>
        <Link to="/about">about </Link>
        <Link to="/contact">contact </Link>
        <Link to="/about/hello">hello </Link>

        </div>
    );
}

export default Header
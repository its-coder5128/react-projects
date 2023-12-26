import React from "react";
import { Link } from "react-router-dom";

function About(){
    return(
        <div className=" bg-green w-full h-screen">
            <h1>
                About
                <Link to="/about/hello" >here</Link>
            </h1>
        </div>
    );
}

export default About
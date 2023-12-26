import React, { useState }from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

function Login(){
    const [cred,setCred] = useState({email:"",password:""})
    const { handleLogin } = useAuth()

    const handleChange = (e)=>{

        let name = e.target.name
        let value = e.target.value

        setCred((prev) => ({...prev, [name] : value}))

        console.log("cred",cred)
    }
    return(
        <div className=" w-full h-screen bg-slate-950 flex justify-center items-center">
            <div className=" w-full max-w-xl bg-slate-800 rounded-md border border-rose-950">
                <form onSubmit={(e) => handleLogin(e,cred)}>
                    <div className=" p-4 mt-4 text-2xl text-gray-400 font-bold flex flex-wrap">
                        <label className="w-full mb-1">Email:</label>
                        <input
                            required
                            className=" w-full p-6  bg-slate-700 rounded-md border border-gray-700"
                            type="email"
                            name="email"
                            value={cred.email}
                            placeholder="Enter your email..."
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div className=" p-4 mt-4 text-2xl text-gray-400 font-bold flex flex-wrap">
                        <label className="w-full mb-1">Password:</label>
                        <input
                            required
                            className=" w-full p-6  bg-slate-700 rounded-md border border-gray-700"
                            type="password"
                            name="password"
                            value={cred.password}
                            placeholder="Enter your password..."
                            onChange={(e)=>handleChange(e)}
                        />
                    </div>
                    <div className=" p-4 ">
                        <button 
                            type="submit"
                            className=" w-full bg-rose-500 hover:bg-pink-800 p-6 rounded-md text-2xl text-gray-300"
                        >LOGIN</button>
                    </div>
                    <div className=" p-4 text-white text-lg text-center ">
                        <p>Dont have an account? Register <Link to="/register" className="underline">here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login
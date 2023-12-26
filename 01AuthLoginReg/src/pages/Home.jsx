import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useMsg } from "../utils/MsgContext";
import { ID } from "appwrite";
import { Trash2 } from 'react-feather';

function Home(){
    const [messageBody,setMessageBody] = useState("")
    const {user,handleLogout} = useAuth()
    const {msg, handleMsgSubmit, handleDeleteMsg} = useMsg()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleMsgSubmit({user_id:user.$id,username:user.name,message:messageBody})
        setMessageBody("")
    }

    return(
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex w-full max-w-xl justify-between">
                <h1 className=" text-gray-400 w-full max-w-xl px-4 py-2 text-2xl font-bold">ROOM : </h1>
                
                <button 
                    onClick={handleLogout}
                    className="  border-b-2 border-rose-500 font-bold mb-2 hover:bg-rose-800 cursor-pointer px-4  text-gray-300 rounded-md" >
                        Logout
                    </button>
               
            </div>
            <div className=" w-full max-w-xl h-5/6 bg-slate-800 rounded-md border border-rose-950">
                <div className=" text-gray-400 mx-7 my-2">
                    <small>Welcome, <strong>{user?.name}</strong></small>
                </div>
                <div className=" w-11/12 h-40 mx-auto bg-gray-700 rounded-md border border-gray-500">
                    <form 
                        name="message"
                        className=" h-full "
                        onSubmit={handleSubmit}
                    >
                        <div className=" p-2 pb-0 w-full h-4/6 ">
                            <textarea 
                                required 
                                name="message body"
                                className=" outline-none border-none w-full h-full rounded-md bg-gray-600 resize-none p-2 text-gray-400  "
                                maxLength="250"
                                placeholder="Say something..." 
                                onChange={(e) => {setMessageBody(e.target.value)}}
                                value={messageBody}
                                />
                        </div>

                        <div className=" p-2 w-full h-2/6 relative">
                            <input className=" absolute right-2 bg-rose-500 hover:bg-pink-800 cursor-pointer px-6 py-2 text-white rounded-md" type="submit" value="send"/>
                        </div>
                    </form>
                </div>
                <div className=" w-11/12 h-4/6 p-2 mx-auto rounded-md "> 
                        <div className=" w-full h-full overflow-scroll">
                            <ul>
                                {
                                    msg.map((item)=>(
                                        <li key={ID.unique()} className= {` flex flex-col pr-2 ${user?.$id !== item.user_id ? "items-start":"items-end"}`}> 
                                                <small className=" text-gray-400 px-4">{item.username}</small>
                                                <div className="flex gap-3 justify-center items-center">
                                                    {user?.$id === item.user_id && 
                                                    <button 
                                                        className=" text-gray-400 pb-2"
                                                        onClick={() => handleDeleteMsg(item.$id)}
                                                    >
                                                        <Trash2/>
                                                    </button>}
                                                    <div className={` overflow-hidden max-w-96 mb-2 px-4 py-2 rounded-3xl ${user?.$id !== item.user_id ? "border-2 border-yellow-500":"bg-yellow-500"}`}>
                                                        <p className=" max-w-96 font-bold text-white">{item.message}</p>
                                                    </div>

                                                </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>                    
                </div>

            </div>
            
        </div>
    );
}

export default Home
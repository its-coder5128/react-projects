import { createContext, useContext, useState, useEffect } from "react";
import { account } from "../appwriteConfig";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    useEffect(()=>{
        getUseronLoad()
    },[])
    
    const getUseronLoad = async ()=>{
        
        try{
            let accDetails = await account.get();
            setUser(accDetails)   
        }catch(error){
            console.error(error);
        }

        setLoading(false)  
    }

    const handleRegisterNewUser = async (e,cred) => {

        e.preventDefault()

        console.log("cred",cred);

        try{
            let response = await account.create(ID.unique(), cred.email, cred.password,cred.name);
            console.log("res",response)
            await account.createEmailSession(cred.email,cred.password)
            let accDetails = await account.get();
            setUser(accDetails)   

        }catch(error){
            console.log(error)
        }

    }
    const handleLogin = async (e,cred) => {

        e.preventDefault()

        console.log("cred",cred);

        try{
            await account.createEmailSession(cred.email,cred.password)
            let accDetails = await account.get();
            setUser(accDetails)   

        }catch(error){
            console.log(error)
        }

    }
    const handleLogout = async () => {

        try{
            let response = await account.deleteSessions('current');
            setUser(null) 

        }catch(error){
            console.log(error)
        }

    }
    const contextData ={
        user,
        handleRegisterNewUser,
        handleLogin,
        handleLogout,
    }
    
    return(
        <AuthContext.Provider value={contextData}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{ return useContext(AuthContext)}

export default AuthContext
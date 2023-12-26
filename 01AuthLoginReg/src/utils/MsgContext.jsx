import { useContext, createContext,useState, useEffect } from "react";
import client,{ database } from "../appwriteConfig";
import conf from "../conf/conf";
import { ID,Query } from "appwrite";

const MsgContext = createContext();

export const MsgProvider = ({children}) => {
    const [msg,setMsg] = useState([])

    useEffect(()=>{
        getMessages()
        const unsubscribe = client.subscribe(`databases.${conf.appwriteDatabaseID}.collections.${conf.appwriteRoomID}.documents`, response => {

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                setMsg(prevState => [response.payload, ...prevState])
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                setMsg(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        console.log('unsubscribe:', unsubscribe)
      
        return () => {
          unsubscribe();
        };
    },[])

    const getMessages = async ()=>{
        let response = await database.listDocuments(conf.appwriteDatabaseID, conf.appwriteRoomID,[Query.orderDesc("$createdAt"),Query.limit(100)]);
        setMsg(response.documents)
    }
    const handleMsgSubmit = async (cred)=>{
        try{
            let response = await database.createDocument(conf.appwriteDatabaseID,conf.appwriteRoomID, ID.unique(),cred);
            
        }catch(error){
            console.error(error)
        }
    }
    const handleDeleteMsg = async (doc_id)=>{
        try{
            let response = await database.deleteDocument(conf.appwriteDatabaseID,conf.appwriteRoomID,doc_id);
            console.log("response message",response)
            
        }catch(error){
            console.error(error)
        }
    }

    const contextMsg = {
        msg,
        handleMsgSubmit,
        handleDeleteMsg
    }
    return(
        <MsgContext.Provider value={contextMsg}>
            {children}
        </MsgContext.Provider>
    )
}

export const useMsg = () => { return useContext(MsgContext)}

export default MsgContext
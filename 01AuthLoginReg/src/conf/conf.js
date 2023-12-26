const conf = {
    appwriteEndpoint : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectID : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteRoomID : String(import.meta.env.VITE_APPWRITE_ROOM_COLLECTION_ID),
    appwriteUserMsgID : String(import.meta.env.VITE_APPWRITE_USER_MSG_COLLECTION_ID),
}

export default conf;
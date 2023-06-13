import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE={
    currentUser: null || JSON.parse(localStorage.getItem("user")),
    login:false,
    message:null
}
export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer, INITIAL_STATE)
    console.log(state.currentUser)
useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.currentUser))
},[state.currentUser])
    return(
        <AuthContext.Provider value={{currentUser:state.currentUser,login:state.login,message:state.message, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;
const AuthReducer = (state,action)=>{
    switch(action.type){
        case "LOGIN":{
            return {currentUser:action.payload,message:"Zalogowano",login:true}
        }
        case "LOGOUT":{
            return {currentUser:null,login:false,message:"Wylogowano"}
        }
        case "REGISTER":{
            return {currentUser:null,login:true,message:"Konto zarejstrowano, można się zalogować"}
        }
        case "REGISTER-N":{
            if(state.currentUser){
                return{currentUser:state.currentUser,message:null}
            }else{
                return{currentUser:null,message:null}
            }
            
        }
        case "UPDATE-USER":{
            return {currentUser:null,login:false,message:"Token wygasł, zaloguj się ponownie"}
        }
        default:
            return state
    }
}
export default AuthReducer;
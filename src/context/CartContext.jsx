import { createContext,useReducer,useEffect} from "react";
import CartReducer from "./CartReducer"

const INITIAL_STATE={Cart:[],
Cartmsg:null}


export const CartContext = createContext(INITIAL_STATE)
export const CartContextProvider = ({children})=>{
const [Cartstate,Cartdispatch] = useReducer(CartReducer, INITIAL_STATE)
console.log(Cartstate)
useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(Cartstate))
},[Cartstate])
    return(
        <CartContext.Provider value={{Cart:Cartstate.Cart,Cartdispatch,Cartmsg:Cartstate.Cartmsg}}>
            {children}
        </CartContext.Provider>
    )
}
export default CartContext
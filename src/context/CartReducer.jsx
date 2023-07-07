
const CartReducer = (state,action)=>{
    switch(action.type){
        case "ADD_NEW":{
            return {...state,Cart:[...state.Cart,action.payload],Cartmsg:"Produkt dodoany do koszyka"}
        }
        case 'DELETE':{
            const newState = state.Cart.filter(item=>item.name!==action.name)
            return {...state,Cart:newState,Cartmsg:null}
        }
        case 'DECREMENT':
            return {...state,Cart:state.Cart.map(item=>{
                if(item.name===action.name && item.quantity>1){
                    return {...item, quantity: item.quantity-1}
                }else{
                    return item
                }
            })}
        case 'INCREMENT':
        return {...state,Cart:state.Cart.map(item=>{
            if(item.name===action.name && item.quantity<6){
                return {...item,quantity: item.quantity+1}
            }
            else{
                return item
            }
        })}
        case 'SIZE':{
            return {...state,Cart:state.Cart.map(item=>{
                if(item.name===action.name){
                    return {...item,size:action.size}
                }else{
                    return item
                }
            })}
        }
        case 'RESET':{
            return {...state,Cartmsg:null}
        }    
        default:
            return state
    }
}
export default CartReducer
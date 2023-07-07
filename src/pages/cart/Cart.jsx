import React, { useContext, useEffect, useReducer, useState } from 'react'
import {Link} from 'react-router-dom'
import './cart.css'
import CartContext from '../../context/CartContext'
export default function Cart() {
    const {Cartdispatch} = useContext(CartContext)
    const {Cart} = useContext(CartContext)
    const [cart,setCart] = useState(()=>{
        const initialValue = []
        const cart = sessionStorage.getItem('cart') 
        if(cart!==null){
            return JSON.parse(cart)
        }
        return initialValue   
})
const reducer = (state,action)=>{
switch(action.type){
    case 'increment':
        return state.map(item=>{
            if(item.name===action.name && item.quantity<6){
                return {...item,quantity: item.quantity+1}
            }
            else{
                return item
            }
        })
    case 'decrement':
        return state.map(item=>{
            if(item.name===action.name && item.quantity>1){
                return {...item,quantity: item.quantity-1}
            }
            else{
                return item
            }
        })
    case 'delete':
        return state.filter(item=>item.name!==action.name)
    case 'color':
        return state.map(item=>{
            if(item.name===action.name){
                return {...item,color: item.color=action.color}
            }
            else{
                return item
            }
        })
    case 'size':
            return state.map(item=>{
                if(item.name===action.name){
                    return {...item,size:item.size=action.size}
                }else{
                    return item
                }
            })
    default:
        return 
}
}
const [state,dispatch] = useReducer(reducer,cart)
let price = 0
let lengthcart = Cart.length
Cart.map(item=>price+=item.quantity*item.price)
useEffect(()=>{
    sessionStorage.setItem('cart',JSON.stringify(state))
},[state])
  return (
    <div id='cart-main'>
    <div id='cart-header'>
          <Link to='/shop'><div id='back-to'>←</div></Link>
          <p id='cart-p'>Twój koszyk:</p>
    </div>
        {!lengthcart?<div>Koszyk pusty</div>:Cart.map((item,index)=>(
                  <div id='all-cart-products' key={index} >
                  <div className='cart-product'>
                  <img src={item.img} alt="" className='cart-photo'/>
                  <div className='single-cart'>
                      <div className='selection-cart'>
                          <label htmlFor="size">Rozmiar</label>
                          <select name="size" id="size" className='box' onChange={(e)=>Cartdispatch({type:'SIZE',name:item.name,size:e.target.value})}>
                              <option style={{display:'none'}}>{item.size}</option>
                              <option value="35">35</option>
                              <option value="36">36</option>
                              <option value="37">37</option>
                              <option value="38">38</option>
                              <option value="39">39</option>
                          </select>
                      </div>
                      <div className='selection-cart'>
                          <p className='cart-p-in'>Cena</p>
                          <p className='cart-p-in'>{`${item.price} zł`}</p>
                      </div>
                      <div className='selection-cart'>
                          <p className='cart-p-in'>Ilość</p>
                          <p className='cart-p-in'>{item.quantity}</p>
                          <p className='cart-p-in minus'id={index} onClick={()=>Cartdispatch({type:'DECREMENT',name:item.name})}>-</p>
                          <p className='cart-p-in plus' id={index} onClick={()=>Cartdispatch({type:'INCREMENT',name:item.name})}>+</p>
                      </div>
                      <div className='selection-cart'>
                          <p className='cart-p-in'>Kwota</p>
                          <p className='cart-p-in'>{`${item.price*item.quantity} zł`}</p>
                      </div>
                  </div>
                  <button className='button-cart' onClick={()=>Cartdispatch({type:'DELETE',name:item.name})}>Usuń</button>
                  </div>
              </div>
            )) }
        {!lengthcart?null:<div id='summary'><div id='sum'><p id='sum-zam'>{`Wartość zamówienia: ${price} zł`}</p></div>
        <button className='button-cart'>Przejdź dalej</button></div>}
  </div>
  )
};

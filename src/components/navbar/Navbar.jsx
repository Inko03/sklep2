import {React , useState, useEffect, useContext}from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import { GrShop } from "react-icons/gr";
import {CartContext} from '../../context/CartContext'
export default function Navbar(count) {
    const {Cart}= useContext(CartContext)
    const admin = false
    if(Cart===null){
        console.log(1)
    }
    const {currentUser} = useContext(AuthContext)
    const [small,setSamll]=useState(false)
    console.log(currentUser)
  return (
    <div className='nav-bar'>
    <div className='title'>
        <span>PULSO</span>
    </div>
<div id='small-menu' style={{cursor:'pointer'}} onClick={()=>{small?setSamll(false):setSamll(true)}}><span className={`burger-menu ${small?"active-menu":null}`}></span></div>
    <div className={small?"active-links":"nav-bar-links"}>
        <Link to='/'><p className='p'>Home</p></Link>
           {(currentUser)?<Link to='/confirm'><p className='p'>Konto</p></Link>:<Link to='/zaloguj'><p className='p'>Zaloguj</p></Link>}
        <Link to='/cart' id='shop'><p className='p pop'><GrShop size='1.2rem'/><div className='popup'>{Cart.length}</div> <div className='cart-pop'>
            {Cart?Cart.map((item, index)=>(
                <div id='pop-shop' key={index} >
                    <img src={item.img} className='popup-shop-cart' alt='' />
                    <p className='text-shop'>{item.name}</p>
                    <p className='text-shop'>{`${item.price} zł`}</p>
                </div>
            )):null}
            </div></p></Link>
        {admin?<Link to='/add'><p className='p'>New post</p></Link>:null}
    </div>
</div>
  )
}

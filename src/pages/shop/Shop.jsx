import {React , useState, useEffect, useContext}from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import './shop.css'
import { GrShop } from "react-icons/gr";
import photo from '../../components/photo/photog.jpg'
import photo2 from '../../components/photo/buty.jpg'
import photo1 from '../../components/photo/photog.jpg'
import AuthContext from '../../context/AuthContext';

export default function Navigation() {
    const [dane, setDane]=useState([])
    const [loader, setLoader]=useState(true)
    const [cart, setCart] = useState(()=>{
        const inistialValue = []
        const cart = sessionStorage.getItem('shopcart')
        if(cart!==null){
            return JSON.parse(cart)
        }
        return inistialValue
    })
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const location = useLocation()
    const lok = location.pathname.split('/')[2]
    //Fetch data from api
        useEffect(()=>{
            const getPost = async()=>{
                await fetch('https://sklep-api.onrender.com/api/shop')
                .then(res=>res.json())
                .then((data)=>{
                    setDane(data)
                    setLoader(false)
                }
                    )
            };
            getPost();
        },[])
    //Photo to slider
    const slides = [
        '/static/media/buty.ab1e7b024167f3618288.jpg',
        '/static/media/photog.4e140a8391379e16fa28.jpg',
        '/static/media/photo2.7a2fb6892c8541b62330.jpg'
    ];
    //Set slider
    const[currentIndex, setCurrentIndex]= useState(0)
    const goToPrev = () =>{
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length-1 : currentIndex-1
        setCurrentIndex(newIndex);
    };
    //Set next, previous
    const goToNext = () =>{
        const isLastSlide = currentIndex === slides.length-1
        const newIndex = isLastSlide ? 0 : currentIndex+1
        setCurrentIndex(newIndex);
    };
    const goToSlide = (slideIndex) =>{
        setCurrentIndex(slideIndex)
    };
    //Select data
    const produkt = lok?dane.filter((item)=>item.category===lok):dane
    // Add to cart
    //console.log(dane)
    const value = cart.length
    //console.log(cart.map((item)=>item.price))
    //Set to loclalSorage
    useEffect(()=>{
        sessionStorage.setItem('shopcart',JSON.stringify(cart))
    },[cart])
    const admin = false
    const {currentUser} = useContext(AuthContext)
    const{login} = useContext(AuthContext)
    const {dispatch}= useContext(AuthContext)
    const {message}= useContext(AuthContext)
    const [small,setSamll]=useState(false)
    if(login){
            setTimeout(()=>{dispatch({type:"REGISTER-N",payload:currentUser})},3000)
    }
    console.log(currentUser)
  return (
    <div id='main'>
        <div className={login?"pop-log-reg is":"pop-log-reg"}>{message}</div>
        <div className='nav-bar'>
            <div className='title'>
                <span>PULSO</span>
            </div>
        <div id='small-menu' onClick={()=>{small?setSamll(false):setSamll(true)}}><span className={`burger-menu ${small?"active-menu":null}`}></span></div>
            <div className={small?"active-links":"nav-bar-links"}>
                <Link to='/'><p className='p'>Home</p></Link>
                   {currentUser?<Link to='/confirm'><p className='p'>Konto</p></Link>:<Link to='/zaloguj'><p className='p'>Zaloguj</p></Link>}
                <Link to='/cart' id='shop'><p className='p pop'><GrShop size='1.2rem'/><div className='popup'>{value}</div> <div className='cart-pop'>
                    {cart.map((item, index)=>(
                        <div id='pop-shop' key={index} >
                            <img src={item.img} className='popup-shop-cart' alt='' />
                            <p className='text-shop'>{item.name}</p>
                            <p className='text-shop'>{`${item.price} zł`}</p>
                        </div>
                    ))}
                    </div></p></Link>
                {admin?<Link to='/add'><p className='p'>New post</p></Link>:null}
            </div>
        </div>
        <div id='all'>
        <div className='slider'>
            <div className='prev-slide' onClick={goToPrev}>❮</div>
            <div className='next-slide' onClick={goToNext}>❯</div>
            <div className='sum-slide'>
                {slides.map((slide, slideIndex)=>(
                    <div key={slideIndex}  onClick={()=>goToSlide(slideIndex)} className={currentIndex===slideIndex ? 'show-slide-big' : 'show-slide'}></div>
                ))}
            </div>
            <img className='slider-photo' src={slides[currentIndex]} alt=""/>
        </div>
        <div className='offerts'>
            <div className='offert'>
                    <img src={photo} alt="" className='offert-photo' />
                    <span className='name-offert'>Botki</span>
                    <Link to='/shop/botki'><button className='button-offert'>Oferta</button></Link>
            </div>
            <div className='offert'>
                    <img src={photo} alt="" className='offert-photo' />
                    <span className='name-offert'>Koturna</span>
                    <Link to='/shop/koturna'><button className='button-offert'>Oferta</button></Link>
            </div>
            <div className='offert'>
                    <img src={photo} alt="" className='offert-photo' />
                    <span className='name-offert'>Obcasy</span>
                    <Link to='/shop/obcas'><button className='button-offert'>Oferta</button></Link>
            </div>
        </div>
        <div className='title-products'>Nasza oferta:</div>
        <div>

        </div>
        <div className='products'>
        {loader?<div id='all-loader'><p id='loading'>Loading</p>
                    <div id='words'>
                        <span className='word'>content</span>
                        <span className='word'>data</span>
                        <span className='word'>text</span>
                        <span className='word'>colors</span>
                    </div></div>:produkt.map((item,index)=>(
                                <div className='product' key={index}>
                                <Link to={`/product/${item._id}`} ><img src={item.img} className='photo-product' alt=''></img></Link>
                                <div className='information-product'>
                                    <p className='product-p price'>{`Cena: ${item.price} zł`}</p>
                                    <p className='product-p cat-number'>Numer kat: zxczAsd#</p>
                                    <div className='sizes-product'>
                                        <p className='product-p'>Rozmiary: </p>
                                        {item.size.map((size,index)=>(<p className='size-product' key={index}>{size}</p>))}
                                    </div>
                                </div>
                                <div id='products-buttons'>
                                    <Link to={`/product/${item._id}`} className='a-pr'><button id='pr-left'>Więcej</button></Link>
                                    <button id='pr-right'>Dodaj do koszyka</button>
                                </div>
                            </div>
        ))}
         </div>
        </div>
        <div className='footer'>Inko03</div>
    </div>
  );
}

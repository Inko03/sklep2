import {React , useState, useEffect, useContext}from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import './shop.css'
import { GrShop } from "react-icons/gr";
import photo from '../../components/photo/photog.jpg'
import photo2 from '../../components/photo/buty.jpg'
import photo1 from '../../components/photo/photog.jpg'
import AuthContext from '../../context/AuthContext';
import Navbar from '../../components/navbar/Navbar'
import CartContext from '../../context/CartContext';
import Popup from '../../components/popup/Popup';
export default function Navigation() {
    const [dane, setDane]=useState([])
    const [loader, setLoader]=useState(true)
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

//////////////////////////////////////////////////////

    // Add to cart
    //console.log(dane)
    const value = cart.length
    //console.log(cart.map((item)=>item.price))
    const[zam,setZam]= useState(dane)
    const [msg,setMsg] =useState(false)
    const [msgval,setMsgval] =useState("") 
    const name = cart.map((item)=>item.name)
    const addCart=(value)=>{
        const newProduct ={
            ...value,
            count:1
        }
        const same = name.filter((item)=>item===newProduct.name)
        if(same.length===0){
            setCart([
                ...cart,
                newProduct
            ])
            setMsg(true)
            setMsgval("Produkt dodany do koszyka")
        }else{
            setMsg(true)
            setMsgval("Produkt jest już w koszyku")
        }
        window.scrollTo(0, 0);
    }

    //Set to loclalSorage
    const {currentUser} = useContext(AuthContext)
    const{login} = useContext(AuthContext)
    const {dispatch}= useContext(AuthContext)
    const {Cartdispatch} = useContext(CartContext)
    const {message}= useContext(AuthContext)
    const [nowtime,setNowTime] = useState()
    const {Cartmsg}=useContext(CartContext)

    const [small,setSamll]=useState(false)
    if(login){
            setTimeout(()=>{dispatch({type:"REGISTER-N",payload:currentUser})},3000)
    }
  return (
    <div id='main'>
        <Popup/>
        <Navbar/>
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
        <div className='title-products'></div>
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

                                    <button id='pr-right' onClick={()=>{Cartdispatch({type:'ADD_NEW',payload:{name:item.name,img:item.img,price:item.price,quantity:1,size:35}})}}>Dodaj do koszyka</button>
                                </div>
                            </div>
        ))}
         </div>
        </div>
        <div className='footer'>Inko03</div>
    </div>
  );

}

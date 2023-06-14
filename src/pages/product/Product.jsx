import { useEffect, useState,useContext} from 'react'
import './product.css'
import photo1 from '../../components/photo/but4.jpg'
import photo2 from '../../components/photo/but3.jpg'
import photo3 from '../../components/photo/but2.jpg'
import photo4 from '../../components/photo/but5.jpg'
import { Link, useLocation } from 'react-router-dom'
export default function Product() {
    const location = useLocation()
    const [loader, setLoader]=useState(true)
    const id = location.pathname.split('/')[2]
    //downolad data from sessionStorage
    const [cart, setCart] = useState(()=>{
        const inistialValue = []
        const cart = sessionStorage.getItem('shopcart')
        if(cart!==null){
            return JSON.parse(cart)
        }
        return inistialValue
    })
    //set data from data to add to cart
    const [dane, setDane]=useState([])
    useEffect(()=>{
        const getPost = async()=>{
            await fetch('http://localhost:2000/api/product/'+id)
            .then(res=>res.json())
            .then(data=>{setDane(data)
                setZam({name:data.name,price:data.price,img:data.img,color:"red",size:"38",quantity:1})})
                setLoader(false)
        }
        getPost()
    },[])
    //add data to cart
    const[zam,setZam]= useState(dane)
    const color =(e)=>{
        const name = e.target.name
        const value = e.target.value
        const newdata = {...zam}
        newdata[name]=value
        setZam(newdata)
    }

    console.log(dane.name)
    useEffect(()=>{
        setZam({name:dane.name})
    },[])
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
            console.log('Not the same')
            setCart([
                ...cart,
                newProduct
            ])
            setMsg(true)
            setMsgval("Produkt dodany do koszyka")
        }else{
            console.log('The same')
            setMsg(true)
            setMsgval("Produkt jest już w koszyku")
        }
        window.scrollTo(0, 0);
    }
    console.log(zam)
    //message update time activity
    if(msg===true){
                setTimeout(()=>{setMsg(false)},3000)
    }else{
        
    }
    //update data in sessionStorage
    useEffect(()=>{
        sessionStorage.setItem('shopcart',JSON.stringify(cart))
    },[cart])
    /////////////////////////////////////////////
    const slides = [1,2,3,4]
    const grab= (e)=>{
        console.log(e.clientX)
    }
  return (<div id='product-main'>
    {loader?<div id='all-loader'><p id='loading'>Loading</p>
  <div id='words'>
      <span className='word'>content</span>
      <span className='word'>data</span>
      <span className='word'>text</span>
      <span className='word'>colors</span>
  </div></div>:
    <div id='cart'>
        <div className={`popup-message ${msg?"active":""}`}>{msgval}</div>
        <Link to='/shop'><div id='back-to'>←</div></Link>
        <div id='big-screen'>
            <div id='bg-product'>
                <img id='img-product' src={dane.img} alt="" />
            </div>
        <div id='title-price'>
            <p id='title'>{dane.name}</p>
            <p id='price'>{dane.price} zł</p>
        </div>
       <div id='description-shoes'>
        <div className='size-all'>
        {dane.size?.map((e)=>(
            <div className='size'>
                <input type="radio" name='size' className='input-radio-size' value={e} onClick={color} />
                <span className='span-size'>{e}</span>
            </div>))}
        </div>
        <div id='button'><button id='button-product'onClick={()=>addCart({name:zam.name,img:zam.img,price:zam.price,color:zam.color||"red",size:zam.size||"37",quantity:1})}>Dodaj do koszyka</button></div>
        <p id='text-product'>{dane.description}</p>
        </div>

    </div>

    </div>}
  </div>
  )
}

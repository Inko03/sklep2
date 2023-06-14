import AuthContext from '../../context/AuthContext';
import {React , useState, useContext,useEffect}from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { GrShop } from "react-icons/gr";
import'./confirmform.css'
export default function Confirmform() {
    const navigate = useNavigate()
    const [dane, setDane]= useState({})
    useEffect(()=>{
        const getPost = async()=>{
            await fetch(('https://sklep-api.onrender.com/api/edituser'),{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${currentUser.accesToken}`
                }
            })
            .then(res=>res.json())
            .then((data)=>{
                if(data.message==="TOKEN_EXPIRE"){
                    dispatch({type:"UPDATE-USER"})
                    navigate('/shop')
                }
                setDane(data)
                setEmail(data.email)
            }
                )
        };
        getPost();
    },[])
    console.log(dane.email)
    const admin = false
    const {currentUser} = useContext(AuthContext)
    const {dispatch}= useContext(AuthContext)
    const [small,setSamll]=useState(false)
    const [cart, setCart] = useState(()=>{
        const inistialValue = []
        const cart = sessionStorage.getItem('shopcart')
        if(cart!==null){
            return JSON.parse(cart)
        }
        return inistialValue
    })
    const value = cart.length
    const [active,setActive] = useState(false)
    const [newdata,setNewdata] = useState()
    const [old,setOld] = useState()
    const [type,setType] = useState()
    const [email, setEmail]=useState()
    const setValue = (e) =>{
        if(e.target.id==='inf-user'){

        }else{
            setType(e.target.id)
            const first = e.target.lastChild
            setOld(first.textContent)
            setActive(true)
        }
    }
    const setData = (e) =>{
        const value = e.target.value
        setNewdata(value)
    }
    const setOff = ()=>{
        setActive(false)
        setNewdata(null)
    }
    console.log(newdata)
    const sendData = async()=>{
        await fetch(('https://sklep-api.onrender.com/api/editdata'),{
            method:'PUT',
            headers:{
                "content-type":"application/json",
                Authorization: `Bearer ${currentUser.accesToken}`
            },
            body: JSON.stringify({
                email,
                type,
                newdata
            })
        })            
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
            setActive(false)
            dispatch({type:"LOGOUT"})
            navigate('/shop')
        })
        .catch((err)=>console.log(err))
    }
    console.log(type,email,newdata)
  return (
    <div id='user'>
        {active?<div id='pop-cha'>
            <p>{`Aktualne: ${old}`}</p>
            <div style={{position:'relative'}}><input type='text'  required id='newdata' className='input-user'  onChange={(e)=>setData(e)}/><span className='span-user'>Nowe</span></div>
            <div>
            <button id='cart-button' className='user-button' onClick={()=>sendData()}>Potwierdzam</button>
            <button id='cart-button' className='user-button' onClick={()=>setOff()}>Anuluj</button>
            </div>
        </div>:null}
              <div className='nav-bar'>
            <div className='title'>
                <span>PULSO</span>
            </div>
        <div id='small-menu' onClick={()=>{small?setSamll(false):setSamll(true)}}><span className={`burger-menu ${small?"active-menu":null}`}></span></div>
            <div className={small?"active-links":"nav-bar-links"}>
                <Link to='/'><p className='p'>Home</p></Link>
                   {currentUser?<Link to='/shop'><p className='p' onClick={()=>dispatch({type:"LOGOUT"})}>Wyloguj się</p></Link>:<Link to='/zaloguj'><p className='p'>Zaloguj</p></Link>}
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
        <div id='confirm-user'> 
            <div id='photo-user'>

            </div>
            <div id='inf-user' onClick={(e)=>setValue(e)}>
                        <div className='user-inf' id='email' value='123' data-action={dane.email?dane.email:''}>
                            <p className='email-user'>Email</p>
                            <p className='email-user'>{dane.email?dane.email:'email'}</p>
                        </div>
                        <div className='user-inf' id='password'>
                            <p className='email-user'>Hasło</p>
                            <p className='email-user'>*********</p>
                        </div>
                        <div className='user-inf' id='name'>
                            <p className='email-user'>Imię, Nazwisko</p>
                            <p className='email-user'>{dane.name?dane.name:"XYZ"}</p>
                        </div>
                        <div className='user-inf'id='adres'>
                            <p className='email-user'>Adres</p>
                            <p className='email-user'>{dane.adres?dane.adres:"XXXXX"}</p>
                        </div>
            </div>
        </div>
    </div>
  )
}

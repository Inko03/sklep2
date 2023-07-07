import React, { useState,useContext } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import './login.css'
export default function Login() {
  const [islogin, setIsLogin] = useState(false)
  const [danelogin,setDanelogin]=useState({})
  const navigate = useNavigate()
  const {dispatch}= useContext(AuthContext)
  const [errmail,setErrmail]=useState()
  const [errpassword,setErrpassword]=useState()
  const [errpassword2,setErrpassword2]=useState()
  const{login} = useContext(AuthContext)
  const {message}= useContext(AuthContext)

//Add data to obcjet 
  const setData = (e)=>{

    const id = e.target.id
    const vlaue = e.target.value
    const newdata = {...danelogin}
    newdata[id]=vlaue
    setDanelogin(newdata)

  }

//Function send data to api and valid them 

  const send = async()=>{

  const pattern = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)
  const number = /[0-9]/;
  const special =/[!@#$%^&*()_{};':"/.,?<>]/;
  const lengthpassword =5

      if(!danelogin.email){
       setErrmail("Podaj email")
       setErrpassword(null)
       setErrpassword2(null)
      }else if(!danelogin.password){
        setErrpassword("Podaj hasło")
        setErrpassword2(null)
        setErrmail(null)
      }else{
    if(islogin?(danelogin.password===danelogin.passwordtwo&&pattern.test(danelogin.email)&&danelogin.password.length>=lengthpassword&&number.test(danelogin.password)&&special.test(danelogin.password)):(pattern.test(danelogin.email))){
      setErrmail(null)
      setErrpassword(null)
      setErrpassword2(null)
    fetch((islogin?'http://localhost:2000/api/newuser':'http://localhost:2000/api/getuser'),{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(danelogin)
    })
    .then(res=>res.json())
    .then((data)=>{
      const pas = data.message
      if(pas){
        if(pas==="NO-USER"){
          setErrmail("Nie ma takiego użytkownika")
        }else if(pas==="WRONG-PASSWORD"){
          setErrpassword("Źle podane hasło")
          setErrmail(null)
          setErrpassword2(null)
        }else if(pas==="USER-EXIST"){
          setErrmail("Email jest już używany")
        }else if(pas==="NEW-USER-ADD"){
          dispatch({type:"REGISTER"})
          navigate("/shop")
        }
      }else{
        setErrpassword()
        setErrmail()
        console.log(data)
        dispatch({type:"LOGIN",payload:data})
        navigate("/shop")
      }
      //seterrmessage(data.email)
    })
    .catch((err)=>console.log(err))
  }else if(!pattern.test(danelogin.email)){
    setErrmail("Email niepoprawny")
  }else if(danelogin.password.length<lengthpassword || !number.test(danelogin.password) || !special.test(danelogin.password)){
    setErrmail(null)
    setErrpassword("Hasło jest za słabe")
  }else if(islogin){
    setErrmail(null)
    setErrpassword("Hasła nie są identyczne")
    setErrpassword2("Hasła nie są identyczne")
  }else{
    setErrmail(null)
    setErrpassword(null)
    setErrpassword2(null)
  }
}

}
    return (
    <div id='main-login'>
      <Link to='/shop'><div id='back-to'>←</div></Link>
        {islogin?<div id='login'>
              <p id='title-login'>PULSO</p>
              <div className='div-input'><input className={`login-input ${errmail?"error":null}`} id='email' type="text" required onChange={(e)=>setData(e)}/><span className='login-span'>{errmail?errmail:"Email"}</span></div>
              <div className='div-input'><input className={`login-input ${errpassword?"error":null}`} id='password' type="password" required onChange={(e)=>setData(e)}/><span className='login-span'>{errpassword?errpassword:"Hasło"}</span></div>
              <div className='div-input'><input className={`login-input ${errpassword2?"error":null}`} id='passwordtwo' type="password" required onChange={(e)=>setData(e)}/><span className='login-span'>{errpassword2?errpassword2:"Hasło"}</span></div>
              <button id='button-login'  onClick={send} >Zarejestruj się</button>
              <p id='register-login'>Posiadasz już konto?<Link id='link-to' onClick={()=>islogin?(setIsLogin(false), setErrmail(null),setErrpassword(null)):(setIsLogin(true), setErrmail(null),setErrpassword(null))}>Zaloguj się</Link></p>
              <p id='secury-msg'>Pamiętej że hasło powinno składać się z jednego znaku specialnego, liter i cyfr(strona testowa nie używaj prawidzyych danych logowania)</p>
        </div>:<div id='login'>
              <p id='title-login'>PULSO</p>
              <div className='div-input'><input className={`login-input ${errmail?"error":null}`} id='email' type="text" required onChange={(e)=>setData(e)} /><span className='login-span'>{errmail?errmail:"Email"}</span></div>
              <div className='div-input'><input className={`login-input ${errpassword?"error":null}`}id='password' type="password" required onChange={(e)=>setData(e)}/><span className='login-span'>{errpassword?errpassword:"Hasło"}</span></div>
              <button id='button-login' onClick={send}>Zaloguj się</button>
              <p id='register-login'>Nie masz jeszcze konta?<Link id='link-to' onClick={()=>islogin?(setIsLogin(false), setErrmail(null),setErrpassword(null)):(setIsLogin(true), setErrmail(null),setErrpassword(null))}>Zarejestruj się</Link></p>
        </div>}
    </div>
  )
}
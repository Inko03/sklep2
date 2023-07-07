import {useEffect,useState,useContext,useRef } from 'react'
import CartContext from '../../context/CartContext'
import AuthContext from '../../context/AuthContext'
export default function Popup() {
    const [progres,setProgres] = useState(0)
    const [frame, setFrame] = useState(0)
    const {Cartdispatch}= useContext(CartContext)
    const {Cartmsg}=useContext(CartContext)
    const {dispatch}= useContext(AuthContext)
    const {message} = useContext(AuthContext)
    const [triger,setTriger]= useState(false)
    const [exit,setExit] =useState(false)
    const vlauemsg = useRef(null)
    const popupTarget = useRef(null)
    const [active, setActive] =useState(false)
    useEffect(()=>{
      if(message){
        vlauemsg.current=message
        dispatch({type:"REGISTER-N"})
        setActive(true)
      }else if(Cartmsg){
        vlauemsg.current=Cartmsg
        Cartdispatch({type:"RESET"})
        setActive(true)
      }
    },[message,Cartmsg])
    useEffect(() => {
      if(active){
        //basic interval to 5s 
        popupTarget.current.className="pop-log-reg is"
        const id = setInterval(()=>{
          setFrame(prev=>{
            const newFrmae=prev+1
            if((newFrmae)===100){
              clearInterval(id)
                setFrame(0)
                setActive(false)
                popupTarget.current.className="pop-log-reg"
            }
              return (newFrmae)
          })
        },50)
        //hover on pop up
        if(triger){clearInterval(id)};
        //exit from pop up
<<<<<<< HEAD
        if(exit){
          popupTarget.current.className="pop-log-reg";
          setTimeout(()=>{setFrame(0)},500);
          clearInterval(id);
          setExit(false);
          setActive(false);
        }
=======
          
        if(exit){popupTarget.current.className="pop-log-reg",setTimeout(()=>{setFrame(0)},500),clearInterval(id),setExit(false),setActive(false)};
>>>>>>> e5d41786d8e65a5c79b7c32ecfb166ebc52d9203

        return ()=>{clearInterval(id)};
      }
    },[active,triger,exit]);
    //set new frame to progres bar time
    useEffect(()=>{
      setProgres(frame)
    },[frame])
    console.log(frame)
  return (
    <div ref={popupTarget} className={`pop-log-reg`}  onMouseEnter={()=>setTriger(true)} onMouseLeave={()=>setTriger(false)}>
        <div id='popup-title'><span id='exit-popup' style={{pointerEvents:"none"}}>PULSO</span><span id='exit-popup' style={{cursor:'pointer'}} onClick={()=>{setExit(true)}}>&#10005;</span></div>
        <span id='text-popup' style={{pointerEvents:"none"}}>{vlauemsg.current}</span>
        <span id='progres-bar' style={{left:`${progres}%`}}></span>
    </div>
  )
}

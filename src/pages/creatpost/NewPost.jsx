import React, { useEffect, useState } from 'react'
import './newPost.css'
export default function NewPost() {
    const [status,setStatus] = useState('')
    const [dane,setDane] =useState({
      name:null,
      img:null,
      price:null,
      description:null,
      color:null,
      size:null,
      category:null
    })
    const setdata=(e)=>{
      const id = e.target.id
      const value = e.target.value
      const newdata = {...dane}
      newdata[id]=value
      setDane(newdata)
      console.log(dane)
    }
    const setmultipledata=(e)=>{
      const id = e.target.id
      const value = e.target.value.split(',')
      const newdata = {...dane}
      newdata[id]=value
      setDane(newdata)
      console.log(dane)
    }
    const send = ()=>{
      fetch(('http://localhost:2000/api/add'),{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(dane)
      })
      .then(res=>console.log(res))
      .then(setStatus('Wysłano'))
      .catch((err)=>{
        console.log(err)
      })
    }
  return (
    <div id='new-post'>
      <img alt="" srcset={dane.img} id='show-img'  /> <span>Photo</span><br/>
      <div id='field-input-new-post'><input className='input-new-post' type="text" required id='name' onChange={(e)=>setdata(e)}/><span className='span-new-post'>Title</span><br/></div>
      <div id='field-input-new-post'><input className='input-new-post'  type='text' id='img'required onChange={(e)=>setdata(e)}/><span className='span-new-post'>src-img:./imgaes/photo.jpg</span><br/></div>
      <div id='field-input-new-post'><input className='input-new-post'  type='text' id='price'required onChange={(e)=>setdata(e)}/><span className='span-new-post'>Price</span><br/></div>
      <div id='field-input-new-post'><input className='input-new-post'  type='text' id='category'required onChange={(e)=>setdata(e)}/><span className='span-new-post'>category</span><br/></div>
      <div id='field-input-new-post'><input className='input-new-post'  type='text' id='color'required onChange={(e)=>setmultipledata(e)}/><span className='span-new-post'>Color</span><br/></div>
      <div id='field-input-new-post'><input className='input-new-post'  type='text' id='size'required onChange={(e)=>setmultipledata(e)}/><span className='span-new-post'>Size</span><br/></div>
      <div id='field-input-new-post'><textarea className='input-new-post' name="" id="description" required  cols="30" rows="10" onChange={(e)=>setdata(e)}></textarea><span className='span-new-post'>Description</span></div>
      <button onClick={send}>Send</button>
      {status}
    </div>
  )
}

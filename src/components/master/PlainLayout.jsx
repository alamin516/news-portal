import React from 'react'
import AppNavBar from './AppNavBar'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast'
import { cookies } from 'next/headers'

async function getData(){
  let socials= (await (await fetch(`${process.env.HOST}/api/social`,{ cache: 'no-store' })).json())['data']
  let categories= (await (await fetch(`${process.env.HOST}/api/categories`)).json())['data']
  return {socials:socials,categories:categories}
}


const PlainLayout = async({children}) => {
  const data = await getData();

  const cookieStore = cookies()
  const token = cookieStore.get('token')
  let isLogin = false;

  if(typeof token === "undefined"){
    isLogin = false
  }else{
    isLogin = true
  }

  return (
    <>
      <AppNavBar data={data} isLogin={isLogin}/>
      {children}
      <Toaster position="bottom-center"/>
      <Footer data={data}/>
    </>
  )
}

export default PlainLayout
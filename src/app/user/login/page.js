import PlainLayout from '@/components/master/PlainLayout'
import LoginForm from '@/components/user/LoginForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if(typeof token !== "undefined"){
    redirect('/')
  }
  return (
    <PlainLayout>
      <LoginForm/>
    </PlainLayout>
  )
}

export default page
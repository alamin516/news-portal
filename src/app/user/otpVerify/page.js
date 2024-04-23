import PlainLayout from '@/components/master/PlainLayout'
import PinVerify from '@/components/user/PinVerify'
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
      <PinVerify/>
    </PlainLayout>
  )
}

export default page
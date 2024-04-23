import PlainLayout from '@/components/master/PlainLayout'
import EmailVerifyForm from '@/components/user/EmailVerifyForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const page = () => {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if(typeof token !== "undefined"){
    redirect('/')
  }
    
  return (
    <PlainLayout>
      <EmailVerifyForm/>
    </PlainLayout>
  )
}

export default page
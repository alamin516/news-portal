import { cookies} from 'next/headers'
import React from 'react'


async function getData(cookies){
  let option = {method: 'GET', headers: {'Cookies': cookies}, cache: 'no-store'}
  let  profile = (await (await fetch(`${process.env.HOST}/api/user/profile/details`, option)).json())['data'];
  return {profile: profile}
}

const page = async() => {
  const cookieStore = cookies();
  let data = await getData(cookieStore);

  return (
    <div>
        
    </div>
  )
}

export default page
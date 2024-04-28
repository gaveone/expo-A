import Login from '@/components/auth/login'
import React from 'react'

export default function page() {
  return (
    <div className=' flex-1 flex flex-col items-center justify-center'>
        <div className='h-[580px] w-[580px] flex flex-col gap-10 items-center justify-center'>
          <Login/>


        </div>
        

    </div>
  )
}

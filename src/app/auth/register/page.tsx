import Register from '@/components/auth/register'
import React from 'react'

function page() {
  return (
    <div className=' flex flex-col flex-1 items-center justify-center'>
        <h1>Register</h1>

        <div className=' h-[580px] w-[580px] flex flex-col gap-8 items-center justify-center'>
            <Register/>

            
        </div>
        


    </div>
  )
}

export default page
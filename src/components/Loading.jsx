import React from 'react'
import loader from '../../public/loader.gif'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center '>
      <img className='object-cover h-[30%] ' src={loader} alt="" />
    </div>
  )
}

export default Loading
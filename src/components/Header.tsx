import global from '@/styles/global'
import React from 'react'

export default function Header() {
  return (
    <div className='mt-40'>
      <p className={`text-5xl font-bold text-[${global.text}]`}>My Stack</p>
    </div>
  )
}

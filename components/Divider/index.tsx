'use client'
import { Divider } from '@nextui-org/react'
import React from 'react'

export default function Divisor() {
  return (
    <div className='flex items-center'>
      <Divider className='bg-[var(--gray-100)] h-[90%]' orientation='vertical'  />
    </div>
  )
}

import Divisor from '@/components/Divider';
import React from 'react'
import { gabarito } from '@/api/dbGabarito'
import Link from 'next/link';

type DataQuestions = {
  id: number;
  resposta: string;
}

interface ResultadoProps{
  dataquestions: DataQuestions[]
}

export default function Resultado({dataquestions}: ResultadoProps) {

  return (
    <>
      <div className='flex flex-row justify-center items-center w-full p-2'>
        <h1 className='text-3xl text-center font-bold'>Quiz Brasil 🧭</h1>
        <Link href={'/'} className='bg-red-400 absolute right-1 top-1 py-2 px-4 rounded-lg text-white'>➡ Sair</Link>
      </div>

      <div className='flex flex-row w-full bg-[var(--background-quiz)]'>
        <div className='flex flex-col w-[50vw] p-4'>
          <h1 className='w-full text-center text-2xl text-white'>Minhas respostas</h1>
          {dataquestions.map((item) => (
            <div className='text-white mt-4' key={item.id}>
              <span className='font-bold text-lg'>Questão | {item.id}</span>
              <p className='text-sm'>{item.resposta}</p>
              <hr />
            </div>
          ))}
        </div>

        <Divisor />

        <div className='flex flex-col p-4 w-[50vw]'>
          <h1 className='w-full text-center text-2xl text-white'>Gabarito</h1>
          {gabarito.map((item) => (
            <div className='text-white mt-4' key={item.id}>
              <span className='font-bold text-lg'>Questão | {item.id}</span>
              <p className='text-sm'>✅ {item.resposta}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

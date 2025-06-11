import React, { use } from 'react'
import { useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

const Home = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function() {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%'
    })
    }else{
      gsap.to(panelRef.current, {
        height: '0%'
      })
    }
  },[panelOpen])
  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='Uber Logo' />
    
      <div>
        {/* image for temporary use */}
        <img className='w-screen h-screen object-cover' src="https://i.imgur.com/khtan7H.png" alt='Uber vehicle map' />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative' >
          <h4 className='text-3xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <div className='line absolute h-16 w-1 top-[45%] left-10 bg-grey-700 rounded-full'></div>
          <input 
          onClick={() => setpanelOpen(true)}
          value={pickup}
          onChange={(e) => setpickup(e.target.value)}
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
          type='text' placeholder='Add a pick-up location'/>
          <input 
          onClick={() => setpanelOpen(true)} 
          value={destination}
          onChange={(e) => setdestination(e.target.value)}
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
          type='text' placeholder='Enter your destination'/>
          </form>
        </div>
        <div ref={panelRef} className='bg-red-500 h-0'>

        </div>
      </div>
    </div>
  )
}

export default Home
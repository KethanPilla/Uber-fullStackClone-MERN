import React, { use } from 'react'
import { useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function() {
    if(panelOpen){
      gsap.to(panelRef.current, {
        height: '70%',
        padding:20
      //  opacity:1
    })
    gsap.to(panelCloseRef.current, {
      opacity: 1
    })
    }else{
      gsap.to(panelRef.current, {
        height: '0%',
        padding:0,
      //  opacity:1

      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  },[panelOpen])
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt='Uber Logo' />
    
      <div>
        {/* image for temporary use */}
        <img className='w-screen h-screen object-cover' src="https://i.imgur.com/khtan7H.png" alt='Uber vehicle map' />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative' >
          <h5 ref={panelCloseRef} onClick={() => setpanelOpen(false)} 
          className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
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
        <div ref={panelRef} className=' bg-white h-0'>
              <LocationSearchPanel />
        </div>
      </div>
      <div className='fixed w-full z-10 bottom-0 bg-white p-3'>
        <div className='flex border-2 border-black rounded-xl w-full p-3 items-center justify-between'>
          <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1682350473/assets/97/e2a99c-c349-484f-b6b0-3cea1a8331b5/original/UberBlack.png' alt='Uber Black' />
        <div className=' w-1/2'>
          <h4 className='font-medium text-sm'>UberGo <span><i class="ri-user-3-line"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 mins away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
      </div>
      <h2 className='text-xl font-semibold'>$12.98</h2>
        </div>
        </div>
    </div>
  )
}

export default Home
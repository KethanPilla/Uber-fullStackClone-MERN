import React from 'react'

const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-[url("https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fFViZXIlMjBmbGVldHxlbnwwfHwwfHx8MA%3D%3D")] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
          <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="uber logo" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <button className='w-full bg-black text-white py-3 rounded mt-5'>Continue</button>

            </div>
        </div>
    </div>
  )
}

export default Home
import React from 'react'
// import React, { createContext } from 'react'

export const UserDataContext = createContext( )

const UserContext = ({children}) => {

    const user = 'Kethan'
  return (
    <div>
        <UserDataContext.Provider value = {user}>
            {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
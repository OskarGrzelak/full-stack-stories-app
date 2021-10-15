import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

export const LoggedUserContext = createContext()
export const useLoggedUser = () => {
  return useContext(LoggedUserContext)
}

export const LoggedUserProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState()

  useEffect(() => {
    try {
      const fetchLoggedUser = async () => {
        const response = await axios.get('/api/v1/users/loggedUser')
        if (response.data.data.user) {
          setLoggedUser(response.data.data.user)
        }
      }
      fetchLoggedUser()
    } catch (err) {
      console.log(err.response.data)
    }
  }, [])

  const value = {
    loggedUser,
    setLoggedUser,
  }

  return (
    <LoggedUserContext.Provider value={value}>
      {children}
    </LoggedUserContext.Provider>
  )
}

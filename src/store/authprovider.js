import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import requests from '../constant/requests';

export const userContext = createContext()

function Authprovider({ children }) {
  const [isloggedin, setIsloggedin] = useState(false)
  const [userData,setUserdata] = useState(null)
  console.log(isloggedin)

  
  useEffect(() => {
    console.log("autheffect")
    const token = localStorage.getItem("accessToken")
    if (token) {
      setIsloggedin(true)
      if (isExpired(token)) {
        const refreshtoken = localStorage.getItem("refreshToken")
        refreshToken(refreshtoken)
      }
      // isExpired(token)
    }
  }, [])

  const login = (tokens) => {
    const { access, refresh,profile_name } = tokens;
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    localStorage.setItem("profileName", profile_name);
    setIsloggedin(true)
  }

  const logOut = () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      localStorage.removeItem("profileName")
      setIsloggedin(false)
    }
  }

  const isExpired = (accesToken) => {
    try {
      const decodedToken = jwtDecode(accesToken);
      const currentTime = Date.now() / 1000;
      console.log("expired", decodedToken.exp < currentTime)
      return decodedToken.exp < currentTime;

    } catch (error) {
      console.log(error);
    }
  }

  const refreshToken = async (refresh) => {
    const requestData = {
      "refresh": refresh
    }
    const requestBody = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    }
    try {
      const response = await fetch(requests.tokenRefresh, requestBody)
      const responseData = await response.json()
      if (responseData.success) {
        console.log("refreshhhhh  ")
        localStorage.removeItem("accessToken")
        localStorage.setItem("accessToken", responseData.data.access)
      }
      else {
        logOut()
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <userContext.Provider value={{ isloggedin,login, logOut }}>
      {children}
    </userContext.Provider>

  )
}

export default Authprovider
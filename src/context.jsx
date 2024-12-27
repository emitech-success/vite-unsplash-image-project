/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useContext } from "react";


const AppContext = createContext()

const getInitialDarkMode = ()=>{
  const prefersDarkMode = window.matchMedia('prefers-color-scheme: dark').matches
  const storedDarkMode = localStorage.getItem('darkTheme');
 
    if (storedDarkMode === null) {
        return prefersDarkMode;
    }
 
    return storedDarkMode === 'true';
  
}

export const AppProvider = ({children})=>{
  const [isDarkTheme, setIsDarkTheme] =useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('goat')

  const toggleDarkTheme = () =>{
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
   localStorage.setItem('darkTheme', newDarkTheme)
  }

  useEffect(()=> {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  },[isDarkTheme])

  return <AppContext.Provider value={{
    isDarkTheme, setIsDarkTheme, toggleDarkTheme,searchTerm, setSearchTerm
  }}>
    {children}
  </AppContext.Provider>
}

export const useGblobalContext =()=>{

  return useContext(AppContext)
}
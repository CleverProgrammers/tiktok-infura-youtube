import { useContext, createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  return useContext(AppContext)
}

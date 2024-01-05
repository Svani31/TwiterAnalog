"use client"
import React, { createContext,useContext } from "react";

interface StorContextProps {
  
}

const StorContext = createContext({} as StorContextProps )

export const useStore = ():StorContextProps => useContext(StorContext)

interface StorProps {
    children:React.ReactNode
}

const StorProvider = ({children}:StorProps) =>{
    

    const store = {
      
    }
    return(
        <StorContext.Provider value={store}>
            {children}
        </StorContext.Provider>
    )
}

export default StorProvider
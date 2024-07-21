"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";

interface ContextProps {
    usersId:[] | undefined
    setUsersId:any
    openButtonHandler: any;
  isRegisterOpen: boolean;
  setIsRegisterOpen: any;
  isSignInOpen: boolean;
  setIsSignInOpen: any;
  isCommentSideOpen: boolean;
  setIsCommentSideOpen: any;
}

// Provide a default value for the context
export const ContextApi = createContext({} as ContextProps)

export const useStore = (): ContextProps => useContext(ContextApi)

interface ProviderProps {
    children: ReactNode;
}

const ContextProvider = ({ children }: ProviderProps) => {
    const [usersId,setUsersId] = useState()
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCommentSideOpen, setIsCommentSideOpen] = useState(false);
  const openButtonHandler = (setPatarametr: any, boolean: boolean) => {
    setPatarametr(boolean);
  };
    const store = {
        usersId,setUsersId,
        openButtonHandler,
        isRegisterOpen,
        setIsRegisterOpen,
        isSignInOpen,
        setIsSignInOpen,
        isCommentSideOpen,
        setIsCommentSideOpen,
    }
    return (
        <ContextApi.Provider value={store}>
            {children}
        </ContextApi.Provider>
    );
};

export default ContextProvider
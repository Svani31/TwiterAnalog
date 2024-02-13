"use client";
import React, { createContext, useContext, useState } from "react";

interface StorContextProps {
  openButtonHandler: any;
  isRegisterOpen: boolean;
  setIsRegisterOpen: any;
  isSignInOpen: boolean;
  setIsSignInOpen: any;
}

const StorContext = createContext({} as StorContextProps);

export const useStore = (): StorContextProps => useContext(StorContext);

interface StorProps {
  children: React.ReactNode;
}

const StorProvider = ({ children }: StorProps) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const openButtonHandler = (setPatarametr: any, boolean: boolean) => {
    setPatarametr(boolean);
  };

  const store = {
    openButtonHandler,
    isRegisterOpen,
    setIsRegisterOpen,
    isSignInOpen,
    setIsSignInOpen,
  };
  return <StorContext.Provider value={store}>{children}</StorContext.Provider>;
};

export default StorProvider;

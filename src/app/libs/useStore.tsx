"use client";
import React, { createContext, useContext, useState } from "react";
import {
  createTheme,
  PaletteOptions,
  ThemeProvider,
} from "@mui/material/styles";
interface StorContextProps {
  openButtonHandler: any;
  isRegisterOpen: boolean;
  setIsRegisterOpen: any;
  isSignInOpen: boolean;
  setIsSignInOpen: any;
  isCommentSideOpen: boolean;
  setIsCommentSideOpen: any;
}

const StorContext = createContext({} as StorContextProps);

export const useStore = (): StorContextProps => useContext(StorContext);

interface StorProps {
  children: React.ReactNode;
}
interface customPallet extends PaletteOptions {
  customColor?: {
    main: string;
  };
}

const StorProvider = ({ children }: StorProps) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isCommentSideOpen, setIsCommentSideOpen] = useState(false);
  const openButtonHandler = (setPatarametr: any, boolean: boolean) => {
    setPatarametr(boolean);
  };

  const theme = createTheme({
    palette: {
      customColor: {
        main: "red",
      },
    } as customPallet,
  });

  const store = {
    openButtonHandler,
    isRegisterOpen,
    setIsRegisterOpen,
    isSignInOpen,
    setIsSignInOpen,
    isCommentSideOpen,
    setIsCommentSideOpen,
  };
  return (
    <StorContext.Provider value={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StorContext.Provider>
  );
};

export default StorProvider;

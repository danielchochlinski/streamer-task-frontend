import React, { createContext, ReactNode, useState } from "react";

interface TAppContext {
  children: ReactNode;
}

const AppContext = createContext({});

export const AppContextProvider = ({ children }: TAppContext) => {
  
  return (
    <AppContext.Provider value={{}}>
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default AppContext;

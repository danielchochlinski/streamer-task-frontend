import React, { createContext, ReactNode, useState } from "react";

interface TAppContext {
  children: ReactNode;
}

interface AppContextValue {
  setTestContext: (status: React.SetStateAction<number>) => void;
  test: number;
}

const AppContext = createContext<AppContextValue>({
  setTestContext: (_status: React.SetStateAction<number>) => {},
  test: 1,
});

export const AppContextProvider = ({ children }: TAppContext) => {
  const [test, setTest] = useState<number>(0);
  const setTestContext = (status: React.SetStateAction<number>) => {
    setTest(status);
  };
  return (
    <AppContext.Provider value={{ setTestContext, test }}>
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default AppContext;

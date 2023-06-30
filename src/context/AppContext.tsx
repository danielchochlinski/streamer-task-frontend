import React, { createContext, ReactNode, useEffect, useState } from "react";

interface TAppContext {
  children: ReactNode;
}

interface AppContextValue {
  favouriteList: string[];
  highlightFavourite: boolean;
  setHighlightFavouriteContext: (status: boolean) => void;
  addFavouriteContext: (status: string) => void;
  removeFavouriteContext: (status: string) => void;
  seedFavouriteList: () => void;
  openForm: boolean;
  setOpenFormContext: (status: boolean) => void;
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextValue>({
  favouriteList: [""],
  highlightFavourite: false,
  setHighlightFavouriteContext: (_status: boolean) => {},
  addFavouriteContext: (_status: string) => {},
  removeFavouriteContext: (_status: string) => {},
  seedFavouriteList: () => {},
  openForm: false,
  setOpenFormContext: (_status: boolean) => {},
  setOpenForm: () => {},
});

export const AppContextProvider = ({ children }: TAppContext) => {
  //used for favourite list
  const [favouriteList, setFavouriteList] = useState<string[]>([]);

  //used for highlighting favourite star in the navigation
  const [highlightFavourite, setHighlightFavourite] = useState(false);
  const setHighlightFavouriteContext = (status: boolean) => {
    setHighlightFavourite(status);
  };

  const addFavouriteContext = (status: string) => {
    setFavouriteList([...favouriteList, status]);
    setHighlightFavourite(true);

    if (localStorage.getItem("favouriteList") == null) {
      localStorage.setItem("favouriteList", "[]");
    }
    let oldData = JSON.parse(localStorage.getItem("favouriteList") || "[]");
    const exists = Array.isArray(oldData) ? oldData.includes(status) : false;
    if (!exists) {
      oldData.push(status);
      localStorage.setItem("favouriteList", JSON.stringify(oldData));
    } else {
      return;
    }
  };

  const removeFavouriteContext = (status: string) => {
    setFavouriteList(favouriteList.filter((item: string) => item !== status));

    const list = JSON.parse(localStorage.getItem("favouriteList") || "[]");
    const filteredList = Array.isArray(list)
      ? list.filter((item: string) => item !== status)
      : [];
    localStorage.setItem("favouriteList", JSON.stringify(filteredList));
  };

  // seed favourite list with local storage if there is any
  const seedFavouriteList = () => {
    const list = JSON.parse(localStorage.getItem("favouriteList") || "[]");
    if (list === null) {
      return;
    } else {
      setFavouriteList(list);
    }
  };

  // seed favourite list
  useEffect(() => {
    seedFavouriteList();
  }, []);

  const [openForm, setOpenForm] = useState<boolean>(false);
  const setOpenFormContext = (status: boolean) => {
    setOpenForm(status);
  };
  return (
    <AppContext.Provider
      value={{
        favouriteList,
        setHighlightFavouriteContext,
        highlightFavourite,
        addFavouriteContext,
        removeFavouriteContext,
        seedFavouriteList,
        openForm,
        setOpenFormContext,
        setOpenForm,
      }}
    >
      <div>{children}</div>
    </AppContext.Provider>
  );
};

export default AppContext;

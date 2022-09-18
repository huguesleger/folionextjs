import { createContext } from "react";

type appContextType = {
  isDarkTheme: boolean;
  navBar: boolean;
  setIsDarkTheme: (value: boolean) => void;
  setNavBar: (value: boolean) => void;
};

const appContext: appContextType = {
  isDarkTheme: true,
  navBar: true,
  setIsDarkTheme: () => {},
  setNavBar: () => {},
};

export const Context = createContext<appContextType>(appContext);

import { createContext } from "react";

type appContextType = {
  isDarkTheme: boolean;
  setIsDarkTheme: (value: boolean) => void;
};

const appContext: appContextType = {
  isDarkTheme: true,
  setIsDarkTheme: () => {},
};

export const Context = createContext<appContextType>(appContext);

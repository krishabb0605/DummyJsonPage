import { createContext, useState } from "react";

export const RecipiesContext = createContext();

const RecipiesProvide = ({ children }) => {
  const [togglePage, setTogglePage] = useState('posts');
  const handleToggle = (pageName) => {
    setTogglePage(pageName);
  };
  return (
    <RecipiesContext.Provider value={{ togglePage, handleToggle }}>
      {children}
    </RecipiesContext.Provider>
  );
};
export default RecipiesProvide;

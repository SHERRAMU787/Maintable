import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [sharedImage, setSharedImage] = useState(null);

  const updateSharedImage = (image) => {
    setSharedImage(image);
  };

  return (
    <AppContext.Provider value={{ sharedImage, updateSharedImage }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };

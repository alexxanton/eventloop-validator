import { User } from '@supabase/supabase-js';
import React, { createContext, useState, useContext, type PropsWithChildren } from 'react';

type DataProviderType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const DataContext = createContext<DataProviderType | undefined>(undefined);

export const DataProvider = ( {children}: PropsWithChildren ) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <DataContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

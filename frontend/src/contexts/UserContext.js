
import { useState, createContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ 
        });

    const updateUser = (newState) => {
        setUser(prevState => ({
          ...prevState,
          ...newState
        }));
      };

  
    return (
      <UserContext.Provider value={{ user, updateUser }}>
        {children}
      </UserContext.Provider>
    );
  };

  export default UserContext;
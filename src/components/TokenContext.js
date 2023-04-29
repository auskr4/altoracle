import { createContext, useState, useEffect } from 'react';
import { getToken } from './Api';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  return <TokenContext.Provider value={token}>{children}</TokenContext.Provider>;
};

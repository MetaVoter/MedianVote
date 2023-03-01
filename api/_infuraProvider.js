import React, { useState, useEffect, createContext } from "react";
import Web3 from "web3";

export const InfuraContext = createContext();

export const InfuraProvider = ({ children }) => {
  const [infura, setInfura] = useState(null);

  useEffect(() => {
    const connect = async () => {
      const web3 = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);
      setInfura(web3);
    };
    connect();
  }, []);

  return (
    <InfuraContext.Provider value={infura}>{children}</InfuraContext.Provider>
  );
};

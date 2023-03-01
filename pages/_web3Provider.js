import React, { useState, useEffect, createContext } from "react";
import Web3 from "web3";

// Create a new Context for the Web3 Provider
export const Web3Context = createContext();

// Create a new Web3 Provider component
export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const connectWeb3 = async () => {
      // Check if the user has a web3 wallet installed
      if (window.ethereum) {
        try {
          // Request access to the user's accounts
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // Create a new Web3 instance using the injected provider
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } catch (error) {
          console.error(error);
        }
      }
    };
    connectWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>
  );
};

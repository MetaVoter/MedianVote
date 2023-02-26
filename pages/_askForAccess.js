import React, { useState } from 'react';
import Web3 from 'web3';

const AskForAccess = () => {
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);

  const handleAccess = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (e) {
        setError(e.message);
      }
    } else {
      setError('Please install MetaMask or connect to a web3 provider');
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {account ? (
        <p>Your account: {account}</p>
      ) : (
        <button onClick={handleAccess}>Allow Access</button>
      )}
    </div>
  );
};

export default AskForAccess;
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import OpenElections from './_openElections';

const testContractAddress = "0xd4E96eF8eee8678dBFf4d535E033Ed1a4F7605b7";
const testABI = 
[{"inputs":[{"internalType":"contract RocketStorageInterface","name":"_rocketStorageAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"by","type":"string"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"EtherWithdrawn","type":"event"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

const EventsList = () => {
  const [events, setEvents] = useState(null);
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [error, setError] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {   

    async function getEvents() {      
      // Check if in the browser and MetaMask is running.
      if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
          setWeb3(new Web3(window.ethereum));
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0].substring(0, 5) + "..." + accounts[0].substring(accounts[0].length - 4));
          const id = await web3.eth.net.getId();
          setNetwork(id);
  
          const myContract = new web3.eth.Contract(testABI, testContractAddress); 
          const options = { fromBlock: '0x0', toBlock: 'latest' };
          const events = await myContract.getPastEvents("EtherWithdrawn", options);
          setEvents(events);
        } 
        catch (e) {
          setError(e.message);
        }
      }
    }
    getEvents();
  }, []);

  return (
    <div>
    {error != null ? <p>Error: {error}</p> : null}
    <p>Account: {account}</p>
    <p>Network: {network}</p>
    <br></br>
    <p>Events:</p>
    <OpenElections fred={web3}/>
    </div>
  );
}

export default EventsList;

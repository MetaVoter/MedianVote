import { useState, useEffect } from 'react';
import VoteList from './_voteList';

const testContractAddress = "0xd4E96eF8eee8678dBFf4d535E033Ed1a4F7605b7";
const testABI = 
[{"inputs":[{"internalType":"contract RocketStorageInterface","name":"_rocketStorageAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"by","type":"string"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"EtherWithdrawn","type":"event"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];

function OpenElections(props) {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getOpenElections() {       
      if (props.fred != null) {  
        try {
          const myContract = new props.fred.eth.Contract(testABI, testContractAddress); 
          const options = { fromBlock: '0x0', toBlock: 'latest' };
          const events = await myContract.getPastEvents("EtherWithdrawn", options);
          setEvents(events);
        } 
        catch (e) {
          setError(e.message);
        }
      }
    }
    getOpenElections();
  }, [props.web3]);

  if (!Array.isArray(events)) {
    return <div>Invalid value for events.</div>;
  }

  //address, blockHash, blockNumber, logIndex, removed, transactionHash, transactionIndex, id, returnValues, event, signature, raw
  const listItems = events.map((item, index) => (
      <div key={index}><VoteList events={events}/></div>
  ));
  return <ol>{listItems}</ol>;
}

export default OpenElections;
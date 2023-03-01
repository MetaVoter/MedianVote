import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import Election from './_election';
import Web3 from "web3";
//import { InfuraContext } from '@/api/_infuraProvider';

function OpenElections(props) {
  const [events, setEvents] = useState(null);
  //const contract = useContext(InfuraContext);

  useEffect(() => {
    async function getOpenElections() { 
      try {
        const web3 = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY); //goerli, mainnet
        const contract = new web3.eth.Contract(contractABI, contractAddress); 
        const options = { fromBlock: '2990000', toBlock: 'latest' };
        const events = await contract.getPastEvents("ElectionCreated", options);
        setEvents(events);
      } 
      catch (error) {
        console.log("getOpenElections - Error (" + error.code + ") - " + error.message);
      }
    }
    getOpenElections();
  }, []);

  const listItems = events?.map((item, index) => (
      <div key={index}>
        <Election event={item}/>
      </div>
  ));
  return <div>{listItems}</div>;
}

export default OpenElections;
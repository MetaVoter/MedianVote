import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI, INFURA_PROJECT_ID} from '../api/_connectionConst'
import Election from './_election';
import Web3 from "web3";

function OpenElections(props) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function getOpenElections() { 
      try {
        //console.log(JSON.stringify(process.env));
        console.log("INFURA_PROJECT_ID" + JSON.stringify(process.env.NEXT_PUBLIC_INFURA_KEY));
        const web3 = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);
        //goerli, mainnet
        const contract = new web3.eth.Contract(contractABI, contractAddress); 
        const options = { fromBlock: '2990000', toBlock: 'latest' };
        const events = await contract.getPastEvents("ElectionCreated", options);
        setEvents(events);
      } 
      catch (error) {
        console.log("Error (" + error.code + ") - " + error.message);
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
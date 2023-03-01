import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import Election from './_election';
import { InfuraContext } from '@/api/_infuraProvider';

function OpenElections(props) {
  const [events, setEvents] = useState(null);
  const infura = useContext(InfuraContext);

  useEffect(() => {
    async function getOpenElections() { 
      try {
        const contract = new infura.eth.Contract(contractABI, contractAddress); //new web3.eth.Contract(contractABI, contractAddress); 
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
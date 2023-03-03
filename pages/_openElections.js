import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import Election from './_election';
import { ethers } from "ethers";
//import { InfuraContext } from '@/api/_infuraProvider';

function OpenElections(props) {
  const [events, setEvents] = useState(null);
  //const contract = useContext(InfuraContext);

  useEffect(() => {
    async function getOpenElections() { 
        console.log("getOpenElections");
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + "e9c4b4abcad34f62af2c0726d08eca08");        
        //const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);            
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        
        const filter = {
          address: contractAddress,
          fromBlock: 2990000,
          toBlock: 'latest',
          topics: [ ethers.utils.id('ElectionCreated(bytes32,string,bytes)')]
        };

        contract.queryFilter(filter).then((events) => {
            //console.log("Got votes" - JSON.stringify(events));
            //events.forEach(element => console.log("Elections: " + element.args[0] + " - " + BigNumber.from(element.args[1]).fromTwos(32) + " - " + element.args[2]));                
            setEvents(events);
        }).catch((error) => {
            console.log("getOpenElections - Error (" + error.code + ") - " + error.message);
        });
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
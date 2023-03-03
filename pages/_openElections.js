import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import ElectionResults from './_electionResults';
import { ethers } from "ethers";
import VoteOnElection from './_voteOnElection';

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

  function parseMetadata(electionEvent){
    let parsedMetadata = null;
    try {
      const metadataBlob = ethers.utils.toUtf8String(electionEvent.args[2]);
      parsedMetadata = JSON.parse(metadataBlob);
      //console.log("parsedMetadata - " + JSON.stringify(parsedMetadata));
    } 
    catch (error) {
        console.log("parseMetadata - Error (" + error.code + ") - " + error.message);
        console.log("parsedMetadata - " + JSON.stringify(parsedMetadata));
    }
    return parsedMetadata;
  }

  const votes = events?.map((item, index) => {
      const parsedMetadata = parseMetadata(item);
      return (
      <div key={index}>
        <VoteOnElection event={item}
                  minValue={parsedMetadata?.minValue} 
                  maxValue={parsedMetadata?.maxValue}
                  name={parsedMetadata?.name}
                  description={parsedMetadata?.description} />
        <br/>
        <br/>
      </div>);
  });
  const electionResults = events?.map((item, index) => {
      const parsedMetadata = parseMetadata(item);
      return (
      <div key={index}>
        <ElectionResults event={item} 
                  minValue={parsedMetadata?.minValue} 
                  maxValue={parsedMetadata?.maxValue}
                  name={parsedMetadata?.name}
                  description={parsedMetadata?.description} />
      </div>);
  });
  const list = (props.showResults ? electionResults : votes);
  return <div><div>{list}</div></div>;
}

export default OpenElections;
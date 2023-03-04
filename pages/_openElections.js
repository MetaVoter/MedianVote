import { useState, useEffect, useContext } from 'react';
import ElectionResults from './_electionResults';
import { ethers } from "ethers";
import VoteOnElection from './_voteOnElection';
import { contractABI, networks } from '@/api/_networkInfo';

const supportedElections = [
  "0xa4a02534a899c2a162c9690d8f7a03f07496a48e77da6cc5c2d3a797ae47a568",
  "0xd2095dc87b3df9e79d4869b46b5aded4170c02c20a78daeaaafd04666efc5fdb"    
];

function OpenElections(props) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function getOpenElections() { 
        console.log("getOpenElections");
        const provider = new ethers.providers.JsonRpcProvider(networks[11155111].rpcProvider);           
        const contract = new ethers.Contract(networks[11155111].contractAddress, contractABI, provider);
        
        const filter = {
          address: networks[11155111].contractAddress,
          fromBlock: networks[11155111].fromBlock,
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

  function electionIdToString(electionId){
    return "0x" + electionId?.slice(2).padStart(64, "0");
  }

  const votes = events?.map((item, index) => {
      //console.log("VOTE ON");
      const electionId = item?.args[0];
      const electionIdString = electionIdToString(electionId);
      const parsedMetadata = parseMetadata(item);
      if (supportedElections.includes(electionIdString)){
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
      }
      else {
        return null;
      }
  });
  const electionResults = events?.map((item, index) => {
      //console.log("RESULTS");
      const electionId = item?.args[0];
      const electionIdString = electionIdToString(electionId);  
      const parsedMetadata = parseMetadata(item);
      if (supportedElections.includes(electionIdString)){
        return (
        <div key={index}>
          <ElectionResults event={item} 
                    minValue={parsedMetadata?.minValue} 
                    maxValue={parsedMetadata?.maxValue}
                    name={parsedMetadata?.name}
                    description={parsedMetadata?.description} 
                    electionId={electionId}  
                    electionIdString={electionIdString}/>
        </div>);
      }
      else {
        return null;
      }
  });
  const list = (props.showResults ? electionResults : votes);
  return <div><div>{list}</div></div>;
}

export default OpenElections;
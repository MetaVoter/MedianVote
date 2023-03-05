import { useState, useEffect, useContext } from 'react';
import ElectionResults from './_electionResults';
import { ethers } from "ethers";
import VoteOnElection from './_voteOnElection';
import { contractABI, networks } from '@/api/_networkInfo';

const supportedElectionsSepolia = [
  "0xa4a02534a899c2a162c9690d8f7a03f07496a48e77da6cc5c2d3a797ae47a568",
  "0xd2095dc87b3df9e79d4869b46b5aded4170c02c20a78daeaaafd04666efc5fdb"    
];

const supportedElectionsGnosis = [
  "0x8e1fa6e71ff1b6dd1d7feab2285f1406c02a462a24f2089f1bc882eabc9b886b",
  "0x5e45826af383761e5dbb6bdab61f5ea9f49d0c4cff6d83a0b4cba321f20c4170",
  "0x8e1fa6e71ff1b6dd1d7feab2285f1406c02a462a24f2089f1bc882eabc9b886b",
  "0x72b927b43bb31a31ab9b0b440bc736e19924d9ac3a87933c54200312effe3951",
  "0xe5e12e2a7dee22e9a9e969eb7b41f09be791f91cc7338e049e122b9968b7f75d"
];

const supportedElections = supportedElectionsGnosis;
const networkWithContractMetadata = 100; //11155111;

function OpenElections(props) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function getOpenElections() { 
        console.log("getOpenElections");
        const provider = new ethers.providers.JsonRpcProvider(networks[networkWithContractMetadata].rpcProvider);           
        const contract = new ethers.Contract(networks[networkWithContractMetadata].contractAddress, contractABI, provider);
        
        const filter = {
          address: networks[networkWithContractMetadata].contractAddress,
          topics: [ ethers.utils.id('ElectionCreated(bytes32,string,bytes)')]
        };

        contract.queryFilter(filter, networks[networkWithContractMetadata].fromBlock, 'latest').then((events) => {
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
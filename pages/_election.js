
import { Web3Context } from "../api/_web3Provider";
import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import Web3 from "web3";
import { ethers } from "ethers";

function Election(props) {  
    const [votes, setVotes] = useState(null);  
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [currentVote, setCurrentVote] = useState("");
    const ethscanURL = "https://sepolia.etherscan.io/tx/" + props.event?.transactionHash;
    //const electionId = Web3.utils.bytesToHex(props.event?.returnValues.electionId);
    const electionId = "0x" + props.event?.returnValues.electionId.slice(2).padStart(64, "0");
    const metadataBlob = Web3.utils.hexToAscii(props.event?.returnValues.metadataBlob);  
    const web3 = useContext(Web3Context);
    
    useEffect(() => {
        function getMetadata(){            
            try {
                console.log("getMetadata");
                if (metadataBlob != null) {
                    const metadata = JSON.parse(metadataBlob);
                    console.log(JSON.stringify(metadata));
                    setName(metadata?.name);
                    setDescription(metadata?.description);
                    setMinValue(metadata?.minValue);
                    setMaxValue(metadata?.maxValue);
                    console.log(typeof(maxValue));
                }
            } 
            catch (error){
                console.log("getMetadata - Error (" + error.code + ") - " + error.message);
            }
        }
        getMetadata();
    }, []);

    /*useEffect(() => {
        async function getVotes() { 
            try {  
                const web3_infura = new Web3("https://sepolia.infura.io/v3/" + "e9c4b4abcad34f62af2c0726d08eca08");        
                //const web3_infura = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);
                const contract = new web3_infura.eth.Contract(contractABI, contractAddress); 
                const options = { fromBlock: '2990000', toBlock: 'latest', filter: {electionId: [props.event?.returnValues.electionId]} };
                const votes = await contract.getPastEvents("Vote", options);
                votes.forEach(element => console.log("Votes: " + web3.utils.toBN(element.returnValues.value) + " - type - " + typeof(element.returnValues.value)));
                setVotes(votes);
            } 
            catch (error) {
                console.log("getVotes - Error (" + error.code + ") - " + error.message);
            }
        }
        getVotes();
    }, []);*/

    useEffect(() => {
        async function getVotes() { 
            const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + "e9c4b4abcad34f62af2c0726d08eca08");        
            //const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);            
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            const filter = {
                address: contractAddress,
                fromBlock: 2990000,
                toBlock: 'latest',
                topics: [ ethers.utils.id('Vote(address,bytes,bytes32)') ]
            };

            contract.queryFilter(filter).then((events) => {
                console.log("Got votes" - JSON.stringify(events));
                events.forEach(element => console.log("Votes: " + web3.utils.toBN(element?.returnValues?.value) + " - type - " + typeof(element?.returnValues?.value)));                
                setVotes(events);
            }).catch((error) => {
                console.log("getVotes - Error (" + error.code + ") - " + error.message);
            });
        }
        getVotes();
    }, []);
    
    //vote(bytes32 electionId, bytes calldata value)
    async function onVoteClick(event, electionId) {
        try {
            const contract = new web3.eth.Contract(contractABI, contractAddress);  
            const accounts = await web3.eth.getAccounts();  //todo get from a provider??
            const parsedValue = parseInt(currentVote);
            const value = (parsedValue < 0 ? web3.utils.toTwosComplement(parsedValue) : parsedValue);
            //const encodedParams = web3.eth.abi.encodeParameters(['bytes32', 'bytes'], [electionId, value]);

            const result = await contract.methods.vote(electionId, value).send({ from: accounts[0], gas: 0 }, function(error, transactionHash) {
                if (error) {
                  console.log('Error:', error);
                } else {
                  console.log('Transaction hash:', transactionHash);
                }});            
            console.log("Result - " + JSON.stringify(result));
        }
        catch (error) {
            console.log("onVoteClick - Error (" + error.code + ") - " + error.message);
        }
    }    

    const listItems = votes?.map((item, index) => (
        <li key={index}>
          <div>{item.returnValues.voter} - {item.returnValues.value} - {item.returnValues.electionId}</div>
        </li>
    ));
    return (
    <div>
        <h4><a href={ethscanURL}>Election</a> - {name}</h4>
        <ul>
            <li>{electionId}</li>
            <li>{description}</li>
            <li>{minValue} to {maxValue}</li>
            <li>Metadata Blob: {metadataBlob}</li>
        </ul>
        <br/>
        <div>
            <h4>Votes:</h4>
            <ol>{listItems}</ol>
        </div>
        <br/>
        Vote: 
            <input type="text" value={currentVote} onChange={(e) => setCurrentVote(e.target.value)}/>
            <button onClick={(event) => onVoteClick(event, props.event?.returnValues.electionId)}>Vote</button>  
        <br/>
        <br/>     
    </div>);
}

export default Election;
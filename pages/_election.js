
import { Web3Context } from "../api/_web3Provider";
import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import Web3 from "web3";

function ConvertByte32ToAscii(hexString){
    const bytes = new Uint8Array(hexString?.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    return new TextDecoder().decode(bytes);
}

function Election(props) {  
    const [votes, setVotes] = useState(null);  
    const ethscanURL = "https://sepolia.etherscan.io/tx/" + props.event?.transactionHash;
    const electionId = "0x" + props.event?.returnValues.electionId.slice(2).padStart(64, "0");
    const metadataBlob = ConvertByte32ToAscii(props.event?.returnValues.metadataBlob);
    const web3 = useContext(Web3Context);
    
    useEffect(() => {
        async function getVotes() { 
        try {          
            const web3_infura = new Web3("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);
            const contract = new web3_infura.eth.Contract(contractABI, contractAddress); 
            const options = { fromBlock: '2990000', toBlock: 'latest', filter: {electionId: [props.event?.returnValues.electionId]} };
            const votes = await contract.getPastEvents("Vote", options);
            setVotes(votes);
        } 
        catch (error) {
            console.log("getVotes - Error (" + error.code + ") - " + error.message);
        }
        }
        getVotes();
    }, []);
    
    //vote(bytes32 electionId, bytes calldata value)
    async function onVoteClick(event, electionId) {
        const contract = new web3.eth.Contract(contractABI, contractAddress);  
        const accounts = await web3.eth.getAccounts();  //todo get from a provider??
        const value = 0x0 // The vote value as bytes
        //const encodedParams = web3.eth.abi.encodeParameters(['bytes32', 'bytes'], [electionId, value]);

        try {
            const result = await contract.methods.vote(electionId, value).send({ from: accounts[0], gas: 0 }, function(error, transactionHash) {
                if (error) {
                  console.log('Error:', error);
                } else {
                  console.log('Transaction hash:', transactionHash);
                }});            
            console.log("Result - " + JSON.stringify(result));
        }
        catch (error) {
            console.log("Error (" + error.code + ") - " + error.message);
        }
    }

    const listItems = votes?.map((item, index) => (
        <li key={index}>
          <div>{item.returnValues.voter} - {item.returnValues.value} - {item.returnValues.electionId}</div>
        </li>
    ));
    return (
    <div>
        <h4><a href={ethscanURL}>Election</a> - {electionId}</h4>
        <ul>
            <li>Metadata URI: {props.event?.returnValues.metadataURI}</li>
            <li>Metadata Blob: {metadataBlob}</li>
        </ul>
        <br/>
        <div>
            <h4>Votes:</h4>
            <ol>{listItems}</ol>
        </div>
        <br/>
        Vote: 
            <input type="text"/>
            <button onClick={(event) => onVoteClick(event, props.event?.returnValues.electionId)}>Vote</button>  
        <br/>
        <br/>     
    </div>);
}

export default Election;
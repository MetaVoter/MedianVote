
//import { Web3Context } from "../api/_web3Provider";
import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI} from '../api/_connectionConst'
import { ethers, BigNumber } from "ethers";
//import { BigNumber } from "@ethersproject/bignumber";  //TODO don't need?

function Election(props) {  
    const [votes, setVotes] = useState(null);   
    const [metadataBlob, setMetadataBlob] = useState(null); 
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [currentVote, setCurrentVote] = useState("");
    const ethscanURL = "https://sepolia.etherscan.io/tx/" + props.event?.transactionHash;
    const electionId = props.event?.args[0];
    const electionIdString = "0x" + props.event?.args[0].slice(2).padStart(64, "0");
    //const web3 = useContext(Web3Context);
    
    useEffect(() => {
        function getMetadata(){  
            console.log(JSON.stringify(props.event));
            try {                
                console.log("getMetadata");
                console.log("Metablob - " + typeof(props.event?.args[2]));
                const metadataBlob = ethers.utils.toUtf8String(props.event?.args[2]);
                setMetadataBlob(metadataBlob);
                
                if (metadataBlob != null) {
                    const metadata = JSON.parse(metadataBlob);
                    console.log(JSON.stringify(metadata));
                    setName(metadata?.name);
                    setDescription(metadata?.description);
                    setMinValue(metadata?.minValue);
                    setMaxValue(metadata?.maxValue);
                }
            } 
            catch (error){
                console.log("getMetadata - Error (" + error.code + ") - " + error.message);
            }
        }
        getMetadata();
    }, []);

    useEffect(() => {
        async function getVotes() { 
            const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + "e9c4b4abcad34f62af2c0726d08eca08");        
            //const provider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.NEXT_PUBLIC_INFURA_KEY);            
            const contract = new ethers.Contract(contractAddress, contractABI, provider);

            const filter = {
                address: contractAddress,
                fromBlock: 2990000,
                toBlock: 'latest',
                topics: [ ethers.utils.id('Vote(address,bytes,bytes32)'), null, electionId]
            };

            contract.queryFilter(filter).then((events) => {
                //console.log("Got votes" - JSON.stringify(events));
                //events.forEach(element => console.log("Votes: " + element.args[0] + " - " + BigNumber.from(element.args[1]).fromTwos(32) + " - " + element.args[2]));                
                setVotes(events);
            }).catch((error) => {
                console.log("getVotes - Error (" + error.code + ") - " + error.message);
            });
        }
        getVotes();
    }, []);
    
    async function onVoteClick(event, electionId) {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            //await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const parsedVote = parseInt(currentVote);

            // Call a function on the contract
            const result = await contract.vote(electionId,  BigNumber.from(parsedVote).toTwos(32));
            console.log(result);
        }
        catch (error) {
            console.log("onVoteClick - Error (" + error.code + ") - " + error.message);
        }
    }       

    //<div>{item.returnValues?.voter} - {item.returnValues?.value} - {item.returnValues?.electionId}</div>
    //- {item.args[2]}
    const listItems = votes?.map((item, index) => (
        <li key={index}>
          <div>{item.args[0]} : {BigNumber.from(item.args[1]).fromTwos(32).toString()}</div>
        </li>
    ));
    return (
    <div>
        <h4><a href={ethscanURL}>Election</a> - {name}</h4>
        <ul>
            <li>{electionIdString}</li>
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
            <button onClick={(event) => onVoteClick(event, electionId)}>Vote</button>  
        <br/>
        <br/>     
    </div>);
}

export default Election;
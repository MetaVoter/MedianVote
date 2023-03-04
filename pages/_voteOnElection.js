
//import { Web3Context } from "../api/_web3Provider";
import { useState, useContext } from 'react';
import { ethers, BigNumber } from "ethers";
import { contractABI, networks } from '@/api/_networkInfo';

function VoteOnElection(props) {
    const [isValidVote, setIsValidVote]  = useState(true);
    const [currentVote, setCurrentVote] = useState("");
    const electionId = props.event?.args[0];
    const electionIdString = "0x" + props.event?.args[0].slice(2).padStart(64, "0");
    //const web3 = useContext(Web3Context);
    
    async function onVoteClick(event, electionId) {
        if (isNaN(currentVote)) {
            setIsValidVote(false);
            return;
        }

        const parsedVote = parseInt(currentVote);
        if ((props.minValue != null && parsedVote < props.minValue) ||
            (props.maxValue != null && parsedVote > props.maxValue)) {
            setIsValidVote(false);
        }
        else {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const network = await provider.getNetwork();
                console.log("Network - " + network.chainId);
                const contract = new ethers.Contract(networks[network.chainId].contractAddress, contractABI, signer);
    
                // Call a function on the contract
                const result = await contract.vote(electionId,  BigNumber.from(parsedVote).toTwos(32));
                console.log(result);
            }
            catch (error) {
                console.log("onVoteClick - Error (" + error.code + ") - " + error.message);
            }
        }        
    }     
    
    function onChangeVote(event){
        let vote = event.target.value;
        setIsValidVote(true);
        setCurrentVote(vote);
    }

    return (
    <div>
        <h2><div id={electionIdString}>{props.name}</div></h2><br/>
        <i>{props.description} ({props.minValue} to {props.maxValue})</i>
        <br/>
        <br/>
        Vote: 
            <input type="text" value={currentVote} onChange={onChangeVote}/>
            <button onClick={(event) => onVoteClick(event, electionId)}>Vote</button>
            {isValidVote ? <p></p> : <p>Invalid vote (out of range or not a number).</p>}
    </div>);
}

export default VoteOnElection;
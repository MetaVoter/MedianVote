
//import { Web3Context } from "../api/_web3Provider";
import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI } from '../api/_connectionConst';
import { ethers, BigNumber } from "ethers";
import { Votes } from './_votes';
import { VoteCollection, VoteInformation } from '@/api/_voteCollection';
import { Volkhov } from 'next/font/google';

function Election(props) {  
    const [votes, setVotes] = useState(null);   
    const [metadataBlob, setMetadataBlob] = useState(null); 
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [minValue, setMinValue] = useState(null);
    const [maxValue, setMaxValue] = useState(null);
    const [isValidVote, setIsValidVote]  = useState(true);
    const [currentVote, setCurrentVote] = useState("");
    const [median, setMedian] = useState(null);
    const [chartData, setChartData] = useState(null);
    const ethscanURL = "https://sepolia.etherscan.io/tx/" + props.event?.transactionHash;
    const electionId = props.event?.args[0];
    const electionIdString = "0x" + props.event?.args[0].slice(2).padStart(64, "0");
    //const web3 = useContext(Web3Context);
    
    useEffect(() => {
        function getMetadata(){
            try {                
                //console.log("getMetadata");
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
                console.log("metadataBlob - " + JSON.stringify(metadataBlob));
            }
        }
        getMetadata();
    }, []);

    useEffect(() => {
        async function getVotes() {
            console.log("getVotes");
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
                setVotes(events);
                console.log("Election - " + electionIdString);
                events.forEach(element => 
                    console.log("Votes: " + element.args[0].substring(0, 5) + "..." + element.args[0].substring(element.args[0].length - 4) +
                    " - " + BigNumber.from(element.args[1]).fromTwos(32) + " - " + element.blockNumber)
                );
                
                let votes = new VoteCollection(minValue, maxValue);
                events?.forEach(event => {
                    votes.addVoteInfo(new VoteInformation(event.args[0], BigNumber.from(event.args[1]).fromTwos(32)));
                });                
                setMedian(votes.calculateMedian());

                let chartData = ["Votes"].concat(votes.values).map(value => [value]);
                setChartData(chartData);

            }).catch((error) => {
                console.log("getVotes - Error (" + error.code + ") - " + error.message);
            });
        }
        getVotes();
    }, []);
    
    async function onVoteClick(event, electionId) {
        if (isNaN(currentVote)) {
            setIsValidVote(false);
            return;
        }
        
        const parsedVote = parseInt(currentVote);
        if ((minValue != null && parsedVote < minValue) ||
            (maxValue != null && parsedVote > maxValue)) {
            setIsValidVote(false);
        }
        else {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                //await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
    
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
        <h2><a href={ethscanURL} id={electionIdString}>{name}</a></h2><br/>
        <h3>Median Vote: {median}</h3><br/>
        <i>{description} ({minValue} to {maxValue})</i>
        <br/>
        <br/>
        Vote: 
            <input type="text" value={currentVote} onChange={onChangeVote}/>
            <button onClick={(event) => onVoteClick(event, electionId)}>Vote</button>
            {isValidVote ? <p></p> : <p>Invalid vote (out of range or not a number).</p>}
        <br/>
        <br/>
        <Votes votes={votes} chartData={chartData}/>  
    </div>);
}

export default Election;

//import { Web3Context } from "../api/_web3Provider";
import { useState, useEffect, useContext } from 'react';
import { contractAddress, contractABI } from '../api/_connectionConst';
import { ethers, BigNumber } from "ethers";
import Votes from './_votes';
import { VoteCollection, VoteInformation } from '@/api/_voteCollection';

function ElectionResults(props) {
    const [votes, setVotes] = useState(null);
    const [median, setMedian] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [countsByNetwork, setCountsByNetwork] = useState({});
    const ethscanURL = "https://sepolia.etherscan.io/tx/" + props.event?.transactionHash;
    const electionId = props.event?.args[0];
    const electionIdString = "0x" + props.event?.args[0].slice(2).padStart(64, "0");
    //const web3 = useContext(Web3Context);

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
                
                let votes = new VoteCollection(props.minValue, props.maxValue);
                events?.forEach(event => {
                    votes.addVoteInfo(new VoteInformation(event.args[0], BigNumber.from(event.args[1]).fromTwos(32)),"sepolia");
                });                
                setMedian(votes.calculateMedian());

                let chartData = ["Votes"].concat(votes.values).map(value => [value]);
                setChartData(chartData);
                setCountsByNetwork(votes.countsByNetwork);

            }).catch((error) => {
                console.log("getVotes - Error (" + error.code + ") - " + error.message);
            });
        }
        getVotes();
    }, []);
    
    return (
    <div>        
        <h2><a href={ethscanURL} id={electionIdString}>{props.name}</a></h2><br/>
        <h3>Median Vote: {median}</h3><br/>
        <i>{props.description} ({props.minValue} to {props.maxValue})</i>
        <br/>
        <br/>
        <Votes votes={votes} chartData={chartData} countsByNetwork={countsByNetwork}/>
    </div>);
}

export default ElectionResults;
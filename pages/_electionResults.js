
import { useState, useEffect } from 'react';
import { ethers, BigNumber } from "ethers";
import Votes from './_votes';
import { VoteCollection, VoteInformation } from '@/api/_voteCollection';
import { contractABI, networks } from '@/api/_networkInfo';

function ElectionResults(props) {
    const [median, setMedian] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [countsByNetwork, setCountsByNetwork] = useState(null);
    const [hasFetchedData, setHasFetchedData] = useState(false);
    const electionId = props.electionId;
    const electionIdString = props.electionIdString;

    function getVotesOneNetwork(networkInfo) {
        const provider = new ethers.providers.JsonRpcProvider(networkInfo.rpcProvider);
        const contract = new ethers.Contract(networkInfo.contractAddress, contractABI, provider);

        const filter = {
            address: networkInfo.contractAddress,
            topics: [ ethers.utils.id('Vote(address,bytes,bytes32)'), null, electionId]
        };

        return contract.queryFilter(filter, networkInfo.fromBlock, 'latest').catch(e => { console.error(e) });
    }

    async function getVotesAllNetworks() {
        const networkIds = (props.networkId ? [props.networkId] : Object.keys(networks));
        const resultsEachNetwork = await Promise.all(Object.values(networks).map(getVotesOneNetwork));
        
        console.log("Election - " + electionIdString);
        const voteCollection = new VoteCollection(props.minValue, props.maxValue);
        resultsEachNetwork?.forEach((resultForNetwork, index) => {
            const networkId = networkIds[index];
            resultForNetwork.forEach(event => {
                console.log("Votes: " + event.args[0].substring(0, 5) + "..." + event.args[0].substring(event.args[0].length - 4) +
                " - " + BigNumber.from(event.args[1]).fromTwos(32) + " - " + event.blockNumber + " - " + networkId);
                voteCollection.addVoteInfo(new VoteInformation(event.args[0], BigNumber.from(event.args[1]).fromTwos(32), networkId));
            });
        });
        return voteCollection;
    }

    useEffect(() => {
        let intervalId;
        const getVotes = async () => {
            console.log("getVotes");
            try {
                const voteCollection = await getVotesAllNetworks();
                setMedian(voteCollection.calculateMedian());

                const chartData = ["Votes"].concat(voteCollection.values).map(value => [value]);
                setChartData(chartData);
                setCountsByNetwork(voteCollection.countsByNetwork);

            } catch(error) {
                console.log("getVotes - Error (" + error.code + ") - " + error.message);
            }
        }
        if (props.interval != null) {
            intervalId = setInterval(getVotes, props.interval);
            if (!hasFetchedData) { 
              getVotes();
              setHasFetchedData(true);
            }
        } 
        else if (!hasFetchedData) {
            getVotes();
            setHasFetchedData(true);
        }        

        // Return a cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [props.interval, hasFetchedData]);
    
    return (
    <div>        
        <h2><div id={electionIdString}>{props.name}</div></h2><br/>
        <h3>Median Vote: {median}</h3><br/>
        <i>{props.description}</i>
        <br/>
        <br/>
        <Votes chartData={chartData} countsByNetwork={countsByNetwork}/>  
    </div>);
}

export default ElectionResults;
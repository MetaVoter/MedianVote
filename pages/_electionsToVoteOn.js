import { useState, useEffect } from 'react';
import VoteOnElection from './_voteOnElection';
import { getElectionEvents, parseMetadata, electionIdToString} from '@/api/_getElections'

/*const supportedElectionsSepolia = [
  "0xa4a02534a899c2a162c9690d8f7a03f07496a48e77da6cc5c2d3a797ae47a568",
  "0xd2095dc87b3df9e79d4869b46b5aded4170c02c20a78daeaaafd04666efc5fdb"    
];*/

function ElectionsToVoteOn(props) {
  const [events, setEvents] = useState(null);
  const supportedElections = props.supportedElections;

  useEffect(() => {
    async function getOpenElections() { 
        const events = await getElectionEvents(supportedElections);
        setEvents(events);
    }
    getOpenElections();
  }, []);

  const votes = events?.map((item, index) => {
      const electionIdString = electionIdToString(item?.args[0]);
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
  return <div><div>{votes}</div></div>;
}

export default ElectionsToVoteOn;
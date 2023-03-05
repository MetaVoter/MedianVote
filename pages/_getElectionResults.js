import { useState, useEffect, useContext } from 'react';
import ElectionResults from './_electionResults';
import { getElectionEvents, parseMetadata, electionIdToString} from '@/api/_getElections'

function GetElectionResults(props) {
  const [events, setEvents] = useState(null);
  const supportedElections = props.supportedElections;

  useEffect(() => {
    async function getOpenElections() { 
        const events = await getElectionEvents(supportedElections);
        setEvents(events);
    }
    getOpenElections();
  }, []);

  const electionResults = events?.map((item, index) => {
      const electionId = item?.args[0];
      const electionIdString = electionIdToString(electionId);  
      const parsedMetadata = parseMetadata(item);
      if (supportedElections.includes(electionIdString) && parsedMetadata != null){
        return (
        <div key={index}>
          <ElectionResults event={item} 
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
  return <div>{electionResults}</div>;
}

export default GetElectionResults;
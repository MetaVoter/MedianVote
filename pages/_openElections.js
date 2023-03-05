import { useState, useEffect, useContext } from 'react';
import ElectionResults from './_electionResults';
import VoteOnElection from './_voteOnElection';
import { getElectionEvents, parseMetadata, electionIdToString} from '@/api/_getElections'

const supportedElectionsSepolia = [
  "0xa4a02534a899c2a162c9690d8f7a03f07496a48e77da6cc5c2d3a797ae47a568",
  "0xd2095dc87b3df9e79d4869b46b5aded4170c02c20a78daeaaafd04666efc5fdb"    
];

const supportedElectionsGnosis = [
  "0x8e1fa6e71ff1b6dd1d7feab2285f1406c02a462a24f2089f1bc882eabc9b886b",
  "0x5e45826af383761e5dbb6bdab61f5ea9f49d0c4cff6d83a0b4cba321f20c4170",
  "0x2453b064c4b538f81f287f554f1d511c33dd00263103d3aaf5b4831c0d8e0e01",
  "0x72b927b43bb31a31ab9b0b440bc736e19924d9ac3a87933c54200312effe3951",
  "0x657a88d176cb0835c2c18b4e9c0dfc4d78e69c8349dd0bb4838b136e0411354e"
];

const supportedElections = supportedElectionsGnosis;

function OpenElections(props) {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    async function getOpenElections() { 
        const events = await getElectionEvents(supportedElectionsGnosis);
        setEvents(events);
    }
    getOpenElections();
  }, []);

  const votes = events?.map((item, index) => {
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
  return <div><div>{votes}</div></div>;
}

export default OpenElections;
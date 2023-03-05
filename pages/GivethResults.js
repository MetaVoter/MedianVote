import PageTemplate from "./_pageTemplate"
import GetElectionResults from "./_getElectionResults";

const supportedElections = [
    "0x8e1fa6e71ff1b6dd1d7feab2285f1406c02a462a24f2089f1bc882eabc9b886b",
    "0x5e45826af383761e5dbb6bdab61f5ea9f49d0c4cff6d83a0b4cba321f20c4170",
    "0x2453b064c4b538f81f287f554f1d511c33dd00263103d3aaf5b4831c0d8e0e01",
    "0x72b927b43bb31a31ab9b0b440bc736e19924d9ac3a87933c54200312effe3951",
    "0x657a88d176cb0835c2c18b4e9c0dfc4d78e69c8349dd0bb4838b136e0411354e"
];

function GivethResults() {
    return (
      <PageTemplate ComponentToRender={GetElectionResults} supportedElections={supportedElections} />
    );
}

export default GivethResults;
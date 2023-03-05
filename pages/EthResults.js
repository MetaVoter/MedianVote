import PageTemplate from "./_pageTemplate"
import GetElectionResults from "./_getElectionResults";

const supportedElections = [
  "0x4b970cad66e71bc1e7e34502d74c1d5d49c5a3d8541ac854e5b6fa1e2fff1b56",
  "0x827dd8e5e5a0ab68b2bcab6c09e8a847e37298b6d2428deddff69f5ab942c4a3",
  "0xbbb4de30d2ae3cb8432d55f4cc76bda777a8e5d73fbfc32c661db569de16af27",
  "0xc9dcd574cfabe3acdb9cec1823f6bc0551750fc2240050b31e883d41081c2c40"
];

function EthResults() {
    return (
      <PageTemplate ComponentToRender={GetElectionResults} supportedElections={supportedElections} />
    );
}

export default EthResults;
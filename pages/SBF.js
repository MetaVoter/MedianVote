import PageTemplate from "./_pageTemplate"
import ElectionsToVoteOn from "./_electionsToVoteOn";

const supportedElections = [
    "0x171aa729ae009b3d66ca96fbe7f3deb88437470180cc2df2bad1671ed8420e2c"
  ];

function SBF() {
    return (
      <PageTemplate ComponentToRender={ElectionsToVoteOn} supportedElections={supportedElections} />
    );
}

export default SBF;
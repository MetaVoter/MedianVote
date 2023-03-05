import PageTemplate from "./_pageTemplate"
import ElectionsToVoteOn from "./_electionsToVoteOn";

const supportedElections = [
    "0xd6fc51d6efd4c431bf36040273de5886db3e76b2c384f1abbc6abb232dee3fd3",
    "0x827dd8e5e5a0ab68b2bcab6c09e8a847e37298b6d2428deddff69f5ab942c4a3",
    "0xbbb4de30d2ae3cb8432d55f4cc76bda777a8e5d73fbfc32c661db569de16af27",
    "0x6b6893917002dd044aa95e2e03a2f60139f688a2f5615c887dc9af1ac585557c"
];

function Eth() {
    return (
      <PageTemplate ComponentToRender={ElectionsToVoteOn} supportedElections={supportedElections} />
    );
}

export default Eth;

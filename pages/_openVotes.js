import VoteList from './_voteList';

function OpenVotes(props) {
  if (!Array.isArray(props.events)) {
    return <div>Invalid value for events prop.</div>;
  }

  //address, blockHash, blockNumber, logIndex, removed, transactionHash, transactionIndex, id, returnValues, event, signature, raw
    const listItems = props.events.map((item, index) => (
        <div key={index}><VoteList events={props.events}/></div>
    ));
    return <ol>{listItems}</ol>;
}

export default OpenVotes;
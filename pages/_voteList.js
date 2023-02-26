
function VoteList(props) {
  if (!Array.isArray(props.events)) {
    return <div>Invalid value for events prop.</div>;
  }

  //address, blockHash, blockNumber, logIndex, removed, transactionHash, transactionIndex, id, returnValues, event, signature, raw
    const listItems = props.events.map((item, index) => (
        <li key={index}>{item.address} - {item.event} - {item.blockNumber}</li>
    ));
    return <div><ol>{listItems}</ol><br/></div>;
}

export default VoteList;

export const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"electionId","type":"bytes32"},{"indexed":false,"internalType":"string","name":"metadataURI","type":"string"},{"indexed":false,"internalType":"bytes","name":"metadataBlob","type":"bytes"}],"name":"ElectionCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"electionId","type":"bytes32"},{"indexed":true,"internalType":"string","name":"tag","type":"string"}],"name":"TagAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"bytes","name":"value","type":"bytes"},{"indexed":true,"internalType":"bytes32","name":"electionId","type":"bytes32"}],"name":"Vote","type":"event"},{"inputs":[{"internalType":"bytes32","name":"electionId","type":"bytes32"},{"internalType":"string","name":"tag","type":"string"}],"name":"addSearchableTag","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"electionId","type":"bytes32"},{"internalType":"string","name":"metadataURI","type":"string"},{"internalType":"bytes","name":"metadataBlob","type":"bytes"}],"name":"createElection","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"elections","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"electionId","type":"bytes32"},{"internalType":"bytes","name":"value","type":"bytes"}],"name":"vote","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export class NetworkInfo {    
    constructor(rpcProvider, contractAddress, fromBlock, network) {
        this.rpcProvider = rpcProvider;
        this.contractAddress = contractAddress;
        this.fromBlock = fromBlock;
        this.network = network;
    }
}

export const networks = {
    11155111: new NetworkInfo("https://sepolia.infura.io/v3/e9c4b4abcad34f62af2c0726d08eca08", "0xe38D9E0676477347bCc0BAd6122F5896C991C962", 2990000, "Sepolia"),
    5: new NetworkInfo("https://goerli.infura.io/v3/e9c4b4abcad34f62af2c0726d08eca08", "0xeBa00871986cD8F3694Cfe96262c8Df5495Bbc7d", 0, "Goerli"),  //8590000
    100: new NetworkInfo("https://www.ankr.com/rpc/gnosis/", "0x0486296a4Fd83012f260892E847BE51743D05903", 0, "Gnosis"), //26780000
};

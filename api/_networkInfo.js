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
    100: new NetworkInfo("https://fittest-cool-rain.xdai.discover.quiknode.pro/0527be6ed91768303fc4a07a11ab2f20c34ee1f7/", "0x0486296a4Fd83012f260892E847BE51743D05903", 26780595, "Gnosis"), //26780595
    137: new NetworkInfo("https://polygon-mainnet.infura.io/v3/e9c4b4abcad34f62af2c0726d08eca08", "0x76DaA4b69dcc7a82fad46312CAB342fc447B11C5", 39980677, "Polygon"),
    10: new NetworkInfo("https://optimism-mainnet.infura.io/v3/e9c4b4abcad34f62af2c0726d08eca08", "0x7a05e6FAF8Eb3deAb20C0f3182836faFF51F4Bb1", 78674976, "Optimism"),
    42161: new NetworkInfo("https://arbitrum-mainnet.infura.io/v3/e9c4b4abcad34f62af2c0726d08eca08", "0x5600E3fd98a3d5f5A235feB0b8b707402A6b7553", 66897037, "Arbitrium")
    //100: new NetworkInfo("https://rpc.ankr.com/gnosis/69ad3b60185b2f8c68ecdd1766fdc6f5ca21cb0240d904dcccdec996ac52195f", "0x0486296a4Fd83012f260892E847BE51743D05903", 26780595, "Gnosis"), //26780595
    // base - 0x20c5637559f928d170Bb1E5C704AAeA52aB46325
    // fantom - 0x20c5637559f928d170Bb1E5C704AAeA52aB46325
};

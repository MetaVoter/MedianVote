import { useState, useEffect, useContext } from 'react';
//import { Web3Context } from "../api/_web3Provider";
import { ethers} from "ethers";

function WalletInfo() {
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [error, setError] = useState(null);
    //const web3 = useContext(Web3Context);

    useEffect(() => {
    async function getWalletInfo() {       
        //if (web3 != null) {  
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                provider.listAccounts().then((accounts) => {
                    setAccount(accounts[0].substring(0, 5) + "..." + accounts[0].substring(accounts[0].length - 4));
                  }).catch((error) => {
                    console.error(error);
                  });
                provider.getNetwork().then((network) => setNetwork(network.chainId));                

                //const accounts = await web3.eth.getAccounts();
                //setAccount(accounts[0].substring(0, 5) + "..." + accounts[0].substring(accounts[0].length - 4));
                //const id = await web3.eth.net.getId();
                //setNetwork(id);
            } 
            catch (e) {
                setError(e.message);
            }
        //}
    }
    getWalletInfo();
    }, []);

    return (
        <div>
            {error != null ? <p>Error: {error}</p> : null}
            <p>Account: {account}</p>
            <p>Network: {network}</p>
            <br></br>
        </div>
    );
}

export default WalletInfo;
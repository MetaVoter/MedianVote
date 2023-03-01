import { useState, useEffect, useContext } from 'react';
import { Web3Context } from "../api/_web3Provider";

function WalletInfo() {
    const [account, setAccount] = useState(null);
    const [network, setNetwork] = useState(null);
    const [error, setError] = useState(null);
    const web3 = useContext(Web3Context);

    useEffect(() => {
    async function getWalletInfo() {       
        if (web3 != null) {  
            try {
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0].substring(0, 5) + "..." + accounts[0].substring(accounts[0].length - 4));
                const id = await web3.eth.net.getId();
                setNetwork(id);
            } 
            catch (e) {
                setError(e.message);
            }
        }
    }
    getWalletInfo();
    }, [web3]);

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
import '@/styles/globals.css'
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { EthereumClient, modalConnectors, walletConnectProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
//import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
//import { goerli, arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon } from 'wagmi/chains'
import { goerli, sepolia } from 'wagmi/chains'

// 1. Get projectID at https://cloud.walletconnect.com
/*if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}*/
const projectId = "33a3f8d6e1ceaab195497471448d025f"

// 2. Configure wagmi client
const chains = [goerli, sepolia]

const { provider } = configureChains(chains, [walletConnectProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ version: '1', appName: 'web3Modal', chains, projectId }),
  provider
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }/*: AppProps*/) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}

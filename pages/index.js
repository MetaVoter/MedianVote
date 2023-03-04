import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import WalletInfo from './_walletInfo'
import OpenElections from './_openElections'
import { Web3Provider } from '../api/_web3Provider'

const inter = Inter({ subsets: ['latin'] })

import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'

export default function Home() {
  return (
    <>
      <Head>
        <title>Votes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>        
        <div>
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
          <br />
          <Web3NetworkSwitch />
        </div>
        <OpenElections/>
      </main>
    </>
  )
}

/*<Web3Provider>
            <WalletInfo/>
            <InfuraProvider>
              <OpenElections/>
            </InfuraProvider>
        </Web3Provider>*/

import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Web3Provider } from '../api/_web3Provider'
import WalletInfo from './_walletInfo'
import OpenElections from './_openElections'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Votes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}> 
        <Web3Provider>
          <WalletInfo/>
          <OpenElections/>
        </Web3Provider>
      </main>
    </>
  )
}

import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import PageTemplate from "./_pageTemplate"
import ElectionsToVoteOn from "./_electionsToVoteOn";
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {  
  return (
    <>
      <Head>
        <title>Median Vote</title>
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Median Voting</h1>
        <p className={styles.summary}>
        <br/>
        A crowd is smarter than an expert when it has diverse, independent, decentralized opinions and an aggregation mechanism.<br/>
        - Thesis of James Surowiecki’s The Wisdom of the Crowds<br/>
        <br/>
        Median Voting is a strategy-proof voting system, which means that it's in a voter's interest to be honest even when they have asymmetric information.<br/>
        <br/>
        DAOs can use median voting to crowdsource values for budgeting, estimations, and self-assessments.<br/>
        <br/>
        To host Median Voting we built MetaVote, a platform that enables customizable on-chain voting strategies. MetaVote is designed to be usable for on-chain DAO governance platforms like Aragon, Daohaus, and Gardens, which struggle with inflexible voting strategies. 
        <br/>
        </p>
        <br/>
        <br/>
        <h2>Open Polls</h2>
        <br/>
        <br/>
        <h3>Ethereum Poll</h3>
        <br/>      
        <Link class={styles.link} href="/Eth">Vote on some general Ethereum related questions.</Link><br/>
        <Link class={styles.link} href="/EthResults">See Results</Link><br/>        
        <br/>
        {/*<h3>Giveth Poll</h3>   
        <br/>   
        <Link href="/Giveth">Giveth Questions</Link><br/>
        <Link href="/GivethResults">Giveth Results</Link><br/>        
        <br/>*/}
        <h3>SBF Poll</h3>  
        <br/>    
        <Link class={styles.link} href="/SBF">Vote on SBF's prison sentence.</Link><br/>
        <Link class={styles.link} href="/SBFResults">See Results</Link><br/>

      </main>
    </>
  );
}
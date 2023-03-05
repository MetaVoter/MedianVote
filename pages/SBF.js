import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import GetElectionResults from "./_getElectionResults";

const supportedElections = [
  "0x171aa729ae009b3d66ca96fbe7f3deb88437470180cc2df2bad1671ed8420e2c"
];

function SBF() {
    return (
      <>
        <Head>
          <title>Median Vote</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <img src="/sbf_hair.gif" />
          <GetElectionResults supportedElections={supportedElections}/>
        </main>
      </>
    );
}

export default SBF;
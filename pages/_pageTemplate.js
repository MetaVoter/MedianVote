import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

import { Web3Button, Web3NetworkSwitch } from '@web3modal/react'

function PageTemplate({ ComponentToRender, ...props }) {
  return (
    <>
      <Head>
        <title>Median Vote</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <table>
          <tbody>
            <tr>
              <td><Web3Button icon="show" label="Connect Wallet" balance="show" /></td>
              <td><Web3NetworkSwitch /></td>
            </tr>
          </tbody>
        </table>
        <br/>
        <br/>
        <ComponentToRender {...props} />
      </main>
    </>
  )
}

export default PageTemplate;
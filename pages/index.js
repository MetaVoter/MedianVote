import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import PageTemplate from "./_pageTemplate"
import ElectionsToVoteOn from "./_electionsToVoteOn";

const inter = Inter({ subsets: ['latin'] })

const supportedElections = [
  "0x171aa729ae009b3d66ca96fbe7f3deb88437470180cc2df2bad1671ed8420e2c"
];

export default function Home() {  
  return (
    <div>
      <PageTemplate ComponentToRender={ElectionsToVoteOn} supportedElections={supportedElections} />
    </div>
  );
}
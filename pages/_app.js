import '@/styles/globals.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

import type { NextPage } from 'next'
import Head from 'next/head'
import LeaderBoard from '../components/leadboard'

const Home: NextPage = (props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Solana Riptide Leader Board</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <LeaderBoard />
    </div>
  )
}

export default Home

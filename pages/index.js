import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import HqLogin from '../compontents/HqLogin'
import HqGetTask from '../compontents/HqGetTask'
import HqDoTask from '../compontents/HqDoTask'
import HqAutoDoTask from '../compontents/HqAutoDoTask'
export default function Home() {
  return (
    <div className={styles.container} id={'root'}>
      <Head>
        <title>Let me skip speak</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to let me skip speak!
        </h1>
        <HqLogin></HqLogin>
        {/* <HqGetTask></HqGetTask>
        <HqDoTask></HqDoTask> */}
        <HqAutoDoTask></HqAutoDoTask>

      </main>

    </div>
  )
}

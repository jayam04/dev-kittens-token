import { Inter } from 'next/font/google'
import styles from './page.module.sass'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  "title": "dev kitten's token"
}

export default function Home() {
  return (
    // <div className={styles.root}>
    // <Link href="/airdrop" style={{fontSize: "30px"}} className={styles.link} >airdrop (devnet) page</Link>
    // <Image
    //   src="/logo.png"
    //   width={200}
    //   height={200}
    //   alt={"logo"}
    // />
    // <br /><br /><br />
    // <p>referral things ...</p>
    // <p>
    // <a className={styles.link} href='https://backpack.app/ref/jayam04'>backpack.app (multi chain crypto wallet)</a>
    // - a6a99b56-3428-419b-9516-29db82897a8a
    // </p>
    // </div>

      <div className={styles.root}>
          <div className={styles.logDiv}>
              <p>dev kitten's token DVKITN</p>
          </div>

          <div className={styles.logDiv}>
              <img src="./favicon.ico" style={{height: 300}} />
          </div>

          <div className={styles.logDiv}>
              <p>referral things ...</p>
              <a className={styles.link} href='https://backpack.app/ref/jayam04'>backpack.app (multi chain crypto wallet)</a>
              <p>invite code - <bold>a6a99b56-3428-419b-9516-29db82897a8a</bold></p>
          </div>
      </div>
  )
}

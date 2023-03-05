import styles from "./airdrop.module.sass"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
    "title": "airdrop",
    "description": "airdrop of dev kitten's token - spl token created by @devkitten"
}


export default function Page() {
    return (
        <div className={styles.root}>
            <div className={styles.root_title}>
                <Link href="/">
                <img 
                    src="/favicon.ico"
                    width={50}
                    height={50}
                    className={styles.root_title_logo}
                ></img></Link>
            <h3 className={styles.title}>
                dev kitten's token / airdrop (devnet)
            </h3>
            </div>

            <div className={styles.form}>
                <p className={styles.form_heading}>address</p>
                <input className={styles.form_input}/>
                <button className={styles.form_button}>airdrop</button>
            </div>

        </div>
    )
}
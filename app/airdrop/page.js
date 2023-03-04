import styles from "./airdrop.module.sass"
import Image from "next/image"

export const metadata = {
    "title": "airdrop",
    "description": "airdrop of dev kitten's token - spl token created by @devkitten"
}


export default function Page() {
    return (
        <div className={styles.root}>
            <div className={styles.root_title}>
                <Image 
                    src="/sticker.png"
                    width={50}
                    height={50}
                    className={styles.root_title_logo}
                ></Image>
            <h3 className={styles.title}>
                dev kitten's token / airdrop
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
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Link href="/airdrop" style={{margin: "10px"}}>airdrop (devnet) page</Link>
  )
}

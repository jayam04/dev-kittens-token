import * as web3 from "@solana/web3.js"
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import * as bs58 from "bs58"


import array from "./secrets/keys/the-sol-project.json" assert {type: "json"}



let privateKey = bs58.decode(array[0])

console.log(privateKey)

var uint8 = Uint8Array.from(privateKey.split("").map(x => x.charCodeAt()))
console.log(uint8)


let signer = web3.Keypair.fromSecretKey(uint8)


const sdk = ThirdwebSDK.fromNetwork("devnet", privateKey);
sdk.wallet.connect(signer)
const program = await sdk.getProgram("Ht2Cb7VJC7y1tedTLc5dqxLi1wQUU8qvE8N7i7xtNBiD", "token");

const balance = await program.balance();
console.log(balance.displayValue);


// for (var i = 0; i < 5; i++) {
//     let recipient = web3.Keypair.generate()
//     console.log(recipient.publicKey)
//     let connection = new web3.Connection(web3.clusterApiUrl("devnet"));

//     let airdropSignature = await connection.requestAirdrop(
//         recipient.publicKey,
//         web3.LAMPORTS_PER_SOL,
//       );

//       await connection.confirmTransaction({ signature: airdropSignature });

// }
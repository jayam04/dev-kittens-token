import * as web3 from "@solana/web3.js";
import transfer from "./transfer.js"
import * as bs58 from "bs58";

import from_b58 from "./fromB58.js";

import array from "./secrets/keys/the-sol-project.json" assert {type: "json"}


// let keypair = web3.Keypair.generate()

// let transaction = new web3.Transaction()

// let fromKeypair = web3.Keypair.generate()
// let toKeypair = web3.Keypair.generate()

// let connection = new web3.Connection(web3.clusterApiUrl("testnet"));


// transaction.add(
//     web3.SystemProgram.transfer({
//       fromPubkey: fromKeypair.publicKey,
//       toPubkey: toKeypair.publicKey,
//       lamports: web3.LAMPORTS_PER_SOL,
//     }),
//   );

// web3.sendAndConfirmTransaction(connection, transaction, [keypair]);


// let keypair = web3.Keypair.generate();
// let payer = web3.Keypair.generate();
// let connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// let airdropSignature = await connection.requestAirdrop(
//   payer.publicKey,
//   web3.LAMPORTS_PER_SOL,
// );

// const res = await connection.confirmTransaction({ signature: airdropSignature });
// console.log(res)



let signerKeypair = web3.Keypair.fromSecretKey(from_b58(array[0]))
await transfer(1011, "7Hu3cwxM8DPah7kTNUYdozsvez4ddJcnVahYi3eKf3TU", signerKeypair)
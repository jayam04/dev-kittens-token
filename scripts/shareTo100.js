// sharing token to 100 addresses

import * as web3 from "@solana/web3.js"
import from_b58 from "./fromB58.js";
import transfer from "./transfer.js";

import array from "../secrets/keys/the-sol-project.json" assert {type: "json"}



let signerKeypair = web3.Keypair.fromSecretKey(from_b58(array[0]));

for (var i = 0; i < 1; i++) {
    const recipient = web3.Keypair.generate()
    const random_no = Math.random()

    let result = await transfer(
        random_no * 10,
        recipient.publicKey,
        signerKeypair
    );

    if (result["signature"]) {
    console.log(`transfered to account ${recipient.publicKey}`)
    }
    else {
        console.log(`error occured : ${result["error"]}`)
    }
}

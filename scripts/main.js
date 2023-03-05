import * as web3 from "@solana/web3.js";
import transfer from "./transfer.js"

import from_b58 from "./fromB58.js";
import array from "./secrets/keys/the-sol-project.json" assert {type: "json"}

let signerKeypair = web3.Keypair.fromSecretKey(from_b58(array[0]))
var result = await transfer(12, "7Hu3cwxM8DPah7kTNUYdozsvez4ddJcnVahYi3eKf3TU", signerKeypair)
// var result = await transfer(12, "abc", signerKeypair)
console.log(result)
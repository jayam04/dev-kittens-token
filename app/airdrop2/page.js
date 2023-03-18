'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import * as web3 from "@solana/web3.js";



export default function newAirdrop() {
    const searchParams = useSearchParams();
    const recipient = searchParams.get('address')
    const amount = searchParams.get('amount')

    useEffect(create_transaction(recipient, amount), [])

    return (
        <form id="airdrop_form">
            <input name="address" />
            <input name="amount" type="amount" />
            <button type="submit">airdrop</button>
        </form>
    )
}



async function create_transaction(recipient, amount) {

    if (!recipient){
        return <></>
    }
    var signer = web3.Keypair.fromSecretKey(from_b58("SOME"))

    // transfer.js
    // start some sdks
    const sdk = ThirdwebSDK.fromNetwork("devnet");
    sdk.wallet.connect(signer);

    // Get the interface for your token program
    const program = await sdk.getProgram(
        "Ht2Cb7VJC7y1tedTLc5dqxLi1wQUU8qvE8N7i7xtNBiD",
        "token"
    );

    // transaction
    try {
        const tx = await program.transfer(recipient, amount);
        console.log('tx', tx.signature)
        // setSignature(tx.signature);
        // setError(null);
        // return tx;
        return <></>
    } catch (exc) {
        if (exc.message === "Invalid public key input") {
            // setError("invalid public key");
            // return { error: "invalid_key" };
            return <></>
        }
        // setError("unknown");
        // return { error: "unknown" };
        return <></>
    }
}




function from_b58(
    S            //Base58 encoded string input
    // A             //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
) {
    const A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    // mapping default for bs58 to uint8

    var d = [],   //the array for storing the stream of decoded bytes
        b = [],   //the result byte array that will be returned
        i,        //the iterator variable for the base58 string
        j,        //the iterator variable for the byte array (d)
        c,        //the carry amount variable that is used to overflow from the current byte to the next byte
        n;        //a temporary placeholder variable for the current byte
    for(i in S) { //loop through each base58 character in the input string
        j = 0,                             //reset the byte iterator
        c = A.indexOf( S[i] );             //set the initial carry amount equal to the current base58 digit
        if(c < 0)                          //see if the base58 digit lookup is invalid (-1)
            return undefined;              //if invalid base58 digit, bail out and return undefined
        c || b.length ^ i ? i : b.push(0); //prepend the result array with a zero if the base58 digit is zero and non-zero characters haven't been seen yet (to ensure correct decode length)
        while(j in d || c) {               //start looping through the bytes until there are no more bytes and no carry amount
            n = d[j];                      //set the placeholder for the current byte
            n = n ? n * 58 + c : c;        //shift the current byte 58 units and add the carry amount (or just add the carry amount if this is a new byte)
            c = n >> 8;                    //find the new carry amount (1-byte shift of current byte value)
            d[j] = n % 256;                //reset the current byte to the remainder (the carry amount will pass on the overflow)
            j++                            //iterate to the next byte
        }
    }
    while(j--)               //since the byte array is backwards, loop through it in reverse order
        b.push( d[j] );      //append each byte to the result
    return new Uint8Array(b) //return the final byte array in Uint8Array format
}
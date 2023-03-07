"use client";

import styles from "./airdrop.module.sass";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import * as web3 from "@solana/web3.js";


// export const metadata = {
//     title: "airdrop",
//     description:
//         "airdrop of dev kitten's token - spl token created by @devkitten",
// };

export default function Page() {
    // const [recipient, setRecipient] = useState()
    // const [amount, setAmount] = useState()
    // const [signature, setSignature] = useState(null);
    // const [error, setError] = useState(null);

    async function create_transaction() {

        if (!recipient){
            return 3
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
            setSignature(tx.signature);
            setError(null);
            // return tx;
            return 0
        } catch (exc) {
            if (exc.message === "Invalid public key input") {
                setError("invalid public key");
                // return { error: "invalid_key" };
                return 2
            }
            setError("unknown");
            // return { error: "unknown" };
            return 1
        }
    }

    useEffect(create_transaction(), [])

    // function update(){
    //     const searchParams = useSearchParams();

    //     setRecipient(searchParams.get("address"))
    //     setAmount(searchParams.get("amount"))
    // }
    return (
        <div className={styles.root}>
            {/* <script src="./app/airdrop/scripts/main.js"></script> */}
            <Title />

            {/* form */}
            <div className={styles.form} id="airdrop_form">
                <form action="/airdrop">
                    <p className={styles.form_heading}>address</p>
                    <input name="address" className={styles.form_input} />
                    <div className={styles.form_layer3}>
                        <input
                            name="amount"
                            className={styles.form_layer3_amount}
                            type="number"
                        />
                        <button
                            type="submit"
                            className={styles.form_layer3_button}
                            // onClick={update()}
                        >
                            airdrop (devnet)
                        </button>
                    </div>
                </form>
            </div>
            {/* <Transaction error={error} signature={signature} /> */}
            <Footer />

            <script src="../../scripts/main.js"></script>
        </div>
    );
}

// title
function Title() {
    return (
        <div className={styles.root_title}>
            <Link href="/">
                <img
                    src="/favicon.ico"
                    width={50}
                    height={50}
                    className={styles.root_title_logo}
                ></img>
            </Link>
            <h3 className={styles.title}>
                dev kitten's token / airdrop (devnet)
            </h3>
        </div>
    );
}

function Transaction(signature, error) {
    var searchParams = useSearchParams();
    var address = searchParams.get("address");
    var amount = searchParams.get("amount");
    console.log(signature, error)

    console.log(address, amount);

    if (!address && !amount) return <></>
    

    if (!error && !signature)
        return (
            <div className={styles.transaction}>
                <p className={styles.transaction_loading}>working hard ...</p>
            </div>
        );

    if (error)
        return (
            <div className={styles.transaction}>
                <p className={styles.transaction_error}>error: {error}</p>
            </div>
        );

    if (signature)
        return <p className={styles.transaction_sig}>signature: {signature}</p>;
}

function Footer() {
    return (
        <div className={styles.footer}>
            <Link className={styles.footer_goback} href="/">
                {"<< go to homepage"}
            </Link>
        </div>
    );
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
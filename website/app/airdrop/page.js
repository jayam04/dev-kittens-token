"use client";

import styles from "./airdrop.module.sass";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import * as web3 from "@solana/web3.js";
import { red } from "bn.js";

// export const metadata = {
//     title: "airdrop",
//     description:
//         "airdrop of dev kitten's token - spl token created by @devkitten",
// };

export default function Page() {
    console.log("page!");

    const searchParams = useSearchParams();
    var address = searchParams.get("address");
    var amount = searchParams.get("amount");

    const [txComponent, setTxComponent] = useState(true);

    // no transaction comp - runs once page is init
    useEffect(() => {
        if (!address && !amount) {
            console.log("no tx component!");
            setTxComponent(false);
        }
    }, []);

    const [transaction, setTransaction] = useState({
        signature: null,
        error: null,
        warn: null,
    });

    useEffect(async () => {
        console.log("checkpoint: useEffect()");
        if (!address) {
            setTransaction({
                signature: null,
                error: "no address found!",
                warn: null,
            });
        } else if (!amount) {
            setTransaction({
                signature: null,
                error: null,
                warn: "no amount found, will airdrop 26 DVKITN",
            });
            amount = 26;
        }
        console.log("checkpoint: useEffect() 2");

        if (amount && address) {
            let signer = web3.Keypair.fromSecretKey(
                from_b58(
                    "2E6EK7HfG6tR45nvswPsNnTAVehkJbxi9gdmJ1PQnjSee9Rr3vQhvkN7SiQu9vXg9UFTb6o5jkjc2KN9hXzBfhip"
                )
            );
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
                const tx = await program.transfer(address, amount);
                setTransaction({ signature: tx.signature, error: null });
                console.log("tx", tx);
                // return tx;
            } catch (exc) {
                if (exc.message === "Invalid public key input") {
                    setTransaction({
                        signature: null,
                        error: "invalid public key!",
                    });
                    // return { error: "invalid_key" };
                }
                // return { error: "unknown" };
            }
        }
    }, []);

    return (
        <div className={styles.root}>
            {/* temp */}
            {/* <button onClick={() => setTransaction({"signature": null, "error": 1})}>set error to 1</button> */}
            {/* <p style={{color: red}}>{transction.error}</p> */}

            <Title />
            <Warning />

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

            {/* transaction */}
            {txComponent ? <Transaction transaction={transaction} /> : <></>}
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

function Transaction({ transaction }) {
    console.log("Transaction()", transaction);

    if (!transaction["error"] && !transaction["signature"])
        return (
            <div className={styles.transaction}>
                {transaction.warn ? (
                    <p className={styles.transaction_warn}>
                        {transaction.warn}
                    </p>
                ) : (
                    <></>
                )}
                <p className={styles.transaction_loading}>working hard ....</p>
            </div>
        );

    if (transaction.error)
        return (
            <div className={styles.transaction}>
                {transaction.warn ? (
                    <p className={styles.transaction_warn}>
                        {transaction.warn}
                    </p>
                ) : (
                    <></>
                )}
                <p className={styles.transaction_error}>
                    error: {transaction.error}
                </p>
            </div>
        );

    if (transaction.signature)
        return (
            <div className={styles.transaction}>
                {transaction.warn ? (
                    <p className={styles.transaction_warn}>
                        {transaction.warn}
                    </p>
                ) : (
                    <></>
                )}
                <p className={styles.transaction_sig}>signature: {signature}</p>
            </div>
        );
}

function Warning() {
    return (
        <div className={styles.warning}>
            <p className={styles.warning_text}>
                we regret website being buggy. if error occurs transaction may
                still be completed, make sure to check your wallet in devnet.
            </p>
        </div>
    );
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
    S //Base58 encoded string input
    // A             //Base58 characters (i.e. "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")
) {
    const A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    // mapping default for bs58 to uint8

    var d = [], //the array for storing the stream of decoded bytes
        b = [], //the result byte array that will be returned
        i, //the iterator variable for the base58 string
        j, //the iterator variable for the byte array (d)
        c, //the carry amount variable that is used to overflow from the current byte to the next byte
        n; //a temporary placeholder variable for the current byte
    for (i in S) {
        //loop through each base58 character in the input string
        (j = 0), //reset the byte iterator
            (c = A.indexOf(S[i])); //set the initial carry amount equal to the current base58 digit
        if (c < 0)
            //see if the base58 digit lookup is invalid (-1)
            return undefined; //if invalid base58 digit, bail out and return undefined
        c || b.length ^ i ? i : b.push(0); //prepend the result array with a zero if the base58 digit is zero and non-zero characters haven't been seen yet (to ensure correct decode length)
        while (j in d || c) {
            //start looping through the bytes until there are no more bytes and no carry amount
            n = d[j]; //set the placeholder for the current byte
            n = n ? n * 58 + c : c; //shift the current byte 58 units and add the carry amount (or just add the carry amount if this is a new byte)
            c = n >> 8; //find the new carry amount (1-byte shift of current byte value)
            d[j] = n % 256; //reset the current byte to the remainder (the carry amount will pass on the overflow)
            j++; //iterate to the next byte
        }
    }
    while (j--)
        //since the byte array is backwards, loop through it in reverse order
        b.push(d[j]); //append each byte to the result
    return new Uint8Array(b); //return the final byte array in Uint8Array format
}

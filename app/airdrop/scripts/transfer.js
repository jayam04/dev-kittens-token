import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

export default async function transfer(amount, recipient, signer) {
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
        return tx
    }
    catch (exc) {
        if (exc.message === "Invalid public key input") {
            return {"error": "invalid_key"}
        }
        return {"error": "unknown"}
    }
}
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";

export default async function transfer(amount, recipient, signer) {
    const sdk = ThirdwebSDK.fromNetwork("devnet");
    sdk.wallet.connect(signer);

    // Get the interface for your token program
    const program = await sdk.getProgram(
        "Ht2Cb7VJC7y1tedTLc5dqxLi1wQUU8qvE8N7i7xtNBiD",
        "token"
    );

    const tx = await program.transfer(recipient, amount);
}


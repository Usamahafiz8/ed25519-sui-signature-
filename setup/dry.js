import { Transaction } from "@mysten/sui/transactions";

import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SuiClient } from "@mysten/sui/client";

const MNEMONIC = "actual cigar sunny trumpet elevator horror actual sing violin verb come way";

async function getWalletAddress() {
    try {
        const seed = await MNEMONIC 
        const keypair = Ed25519Keypair.deriveKeypair(seed); 
        const address = keypair.toSuiAddress(); 
        
        console.log("Wallet Address:", address);
        return address;
    } catch (error) {
        console.error("Error deriving wallet address:", error);
        throw error;
    }
}


async function getWalletBalance() {
    try {
        const client = new SuiClient({url: 'https://fullnode.testnet.sui.io'});
        const address = await getWalletAddress();
        const balance = await client.getBalance({ owner: address });

        console.log("Wallet Balance:", balance.totalBalance, "SUI");
        return balance;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw error;
    }
}

async function main(packageId) {

    try {
        const client = new SuiClient({
          url: 'https://fullnode.mainnet.sui.io:443',
        });
        
        const txb = new Transaction();
        txb.moveCall({
            target: `${packageId}::gatekeeper_helper::test_function`,
            arguments: [
                txb.makeMoveVector(
                  [
                    178, 232, 169, 174,  43, 228, 123,  45, 106,
                    170, 183, 244, 155, 215, 229, 202,  10, 173,
                    115, 141,  30, 235, 151, 249, 186, 167, 184,
                    206,  75, 170, 175,  44, 177, 219,  28, 167,
                    154, 175, 107, 147, 191, 102, 173, 248, 221,
                    206, 220, 164, 178, 233, 230, 123
                  ]
                  ),
                txb.makeMoveVector( [
                    104, 101, 108, 108,
                    111,  32, 119, 111,
                    114, 108, 100
                  ]
                  ),
            ],
        });
        const txBytes = await txb.build({ client });
        const dryRun = await client.dryRunTransactionBlock({ transactionBlock: txBytes });
        console.log("Dry Run Result:", dryRun);
        return dryRun;
    } catch (err) {
        // @ts-ignore
        console.error("Error in dryTest:", err.message);
        throw err;
    }
}

getWalletBalance();
const packageId = "0xb9e58a321612c42fd4901b18f91a40fa02c6276ca389f82c1bf0ac264bd22560";
main(packageId);

## Generate Key Pair with the Flow CLI
flow keys generate

## Deploy contract on testnet
flow project deploy --network=testnet

## Transaction- Create Art on testnet 
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/create-art.cdc --args-json "[{"type":"String","value":"punk"},{"type":"String","value":"first punk on flow"},{"type":"String","value":"IPFS Image URL"},{"type":"UFix64","value":"10.0"}]" 

flow transactions send --network=testnet --signer=testnet-account cadence/transaction/create-art.cdc --arg String:"Art1", --arg String:"First NFT", --arg String:"ImageURL", --arg UFix64:20.0


## Transaction- Mint Art on testnet 
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/mint-art.cdc --args-json
"[{"type":"UInt64","value":"1"},{"type":"UFix64","value":"10.0"}]"


## Transaction- Create Collection on testnet
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/create-collection.cdc 


## Transaction- Create FUSD Vault
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/create-vault.cdc


## Script- Check collection on testnet
flow scripts execute --network=testnet cadence/script/check-collection.cdc --arg Address:0x7cf57145fba43437


## Script- Check FUSD Vault 
flow scripts execute --network=testnet cadence/script/check-FUSDVault.cdc --arg Address:0x57022d35312793f9


## Script- Get FUSD balance on testnet
flow scripts execute --network=testnet cadence/script/get-FUSD-balance.cdc --arg Address:0x7cf57145fba43437


## Script- Get list art template
flow scripts execute --network=testnet cadence/script/list-art-template.cdc


## Remove contract from testnet
flow accounts remove-contract --network=testnet --signer=testnet-account2 ArtNFT
flow accounts update-contract <name> <filename>


0x57022d35312793f9
57a7b9b05ce9edd310489e003110ec59548d7277b4b7f53a5e7ecca770f91998

0x7cf57145fba43437
80d92d4ebae26463ec7554170b4f78759335da148785f93806a8d206ee97c7c2
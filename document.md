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


## Script- Check collection on testnet
flow scripts execute --network=testnet cadence/script/check-collection.cdc --agr Address:0x7cf57145fba43437


## Script- Get FUSD balance on testnet
flow scripts execute --network=testnet cadence/script/get-FUSD-balance.cdc --arg Address:0x7cf57145fba43437


## Script- Get list art template
flow scripts execute --network=testnet cadence/script/list-art-template.cdc
## Deploy contract on testnet
flow project deploy --network=testnet

## Running Create Art transaction on testnet 
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/create-art.cdc --args-json "[{"type":"String","value":"punk"},{"type":"String","value":"first punk on flow"},{"type":"String","value":"IPFS Image URL"},{"type":"UFix64","value":"10.0"}]" 


## Running Mint Art transaction on testnet 
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/mint-art.cdc --args-json
"[{"type":"UInt64","value":"1"},{"type":"UFix64","value":"10.0"}]"


## Running Create Collection transaction on testnet
flow transactions send --network=testnet --signer=testnet-account cadence/transaction/create-collection.cdc 


## Running Check collection script on testnet
flow scripts execute --network=testnet cadence/script/check-collection.cdc --agr Address:0x7cf57145fba43437
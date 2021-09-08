import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export const MINT_ART_TRANSACTION = `

import NonFungibleToken from 0xNONFUNGIBLETOKEN
import ArtNFT from 0XARTNFT

transaction (price: UFix64, artName:String,artDescription:String,imageURL:String) {

    let collection: &NonFungibleToken.Collection
    
    prepare(signer: AuthAccount) {
        if signer.borrow<&ArtNFT.Collection>(from: /storage/ArtCollection) == nil {
            
            let collection <- ArtNFT.createEmptyCollection()
            signer.save(<-collection, to: /storage/ArtCollection)
            signer.link<&{NonFungibleToken.CollectionPublic, ArtNFT.ArtCollectionPublic}>(/public/ArtPublicCollection, target: /storage/ArtCollection)
        }
        self.collection = signer.borrow<&NonFungibleToken.Collection>(from: /storage/ArtCollection) 
             ?? panic("Could not borrow reference to NFT Collection!")
    }
    execute {
        ArtNFT.mintArt(recipient: self.collection,artName:artName,artDescription:artDescription,imageURL:imageURL,price:price)
    }
}
`;


export async function mintArtTransacton(nextArt) {
    const txId = await fcl.send([
        fcl.transaction(MINT_ART_TRANSACTION),
        fcl.args([
            fcl.arg(nextArt.id, t.UInt64),
            fcl.arg(nextArt.price, t.UFix64),
        ]),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]), 
    fcl.limit(9999),
    ])
    .then(fcl.decode);

    return fcl.tx(txId).onceSealed();
}



export const SETUP_FUSD_VAULT = `
import FungibleToken from 0xFUNGIBLETOKEN
import FUSD from 0XFUSTOKEN

transaction {
  prepare(signer: AuthAccount) {

    if( signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
      return
    }
  
    signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)
    signer.link<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver, target: /storage/fusdVault)
    signer.link<&FUSD.Vault{FungibleToken.Balance}>(/public/fusdBalance, target: /storage/fusdVault)
  }
}
`;

export async function setupFUSDVaultTransaction() {
  const txId = await fcl.send([
    fcl.transaction(SETUP_FUSD_VAULT),
    fcl.payer(fcl.authz),
    fcl.proposer(fcl.authz),
    fcl.authorizations([fcl.authz]),
    fcl.limit(99),
  ])
  .then(fcl.decode);

  return fcl.tx(txId).onceSealed();
}



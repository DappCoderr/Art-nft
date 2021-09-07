import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export const MINT_ART_TRANSACTION = `

import FungibleToken from 0xFUNGIBLETOKEN
import NonFungibleToken from 0xNONFUNGIBLETOKEN
import FUSD from 0XFUSTOKEN
import ArtContract from 0XARTCONTRACT


transaction(recipient: Address, price:UFix64, artID: UInt64, name:String, imageURL:String, description:String) {

    let sentVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

        if signer.borrow<&ArtContract.Collection>(from: /storage/ArtCollection) == nil {
            let collection <- ArtContract.createEmptyCollection()
            signer.save(<-collection, to: /storage/ArtCollection)
            signer.link<&{NonFungibleToken.CollectionPublic, ArtContract.ArtPublicCollection}>(/public/ArtPublicCollection, target:/storage/ArtCollection)
        }

        let vaultRef = signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)
        self.sentVault <- vaultRef.withdraw(amount: price)

    }

    execute {
        let recipient = getAccount(recipient)

        let receiver = recipient.getCapability(/public/ArtPublicCollection)
                        .borrow<&{ArtContract.ArtPublicCollection}>() ?? 
                        panic("Could not receiver refrence to the art collection")

        ArtContract.mintArt(recipient: receiver, vault: <-self.sentVault, artID:artID, name:name, imageURL:imageURL, description:description)
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



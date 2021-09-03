import NonFungibleToken from "../contract/NonFungibleToken.cdc"
import ArtContract from "../contract/ArtContract.cdc"
import FungibleToken from "../contract/FungibleToken.cdc"
import FUSD from "../contract/FUSD.cdc"

transaction(recipient: Address, price:UFix64, artID: UInt64) {

    let collection: &NonFungibleToken.Collection
    let sendVault: @FungibleToken.Vault

    prepare(signer: AuthAccount) {

        if signer.borrow<&ArtContract.Collection>(from: /storage/ArtCollection) == nil {

            let collection <- ArtContract.createEmptyCollection()
            signer.save(<-collection, to: /storage/ArtCollection)
            signer.link<&{NonFungibleToken.CollectionPublic, ArtContract.ArtPublicCollection}>(/public/ArtPublicCollection, target:storage/ArtCollection)
        }

        // self.collection = signer.borrow<&NonFungibleToken.Collection>(from: /storage/ArtCollection)
        //     ?? panic ("Could not borrow Art Collection refrence")

        let vaultRef = signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)

        self.sendVault <- vaultRef.withdraw(amount: price)

    }

    execute {
        let recipient = getAccount(recipient)

        let receiver = recipient.getCapability(ArtContract.CollectionPublic)!
                        .borrow<&{NonFungibleToken.CollectionPublic}>() ?? 
                        panic("Could not receiver refrence to the art collection")

        self.mintArt(recipient: receiver, vault: <-self.sendVault,  artID:artID)
    }
}
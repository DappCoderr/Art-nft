import FungibleToken from "../contract/FungibleToken.cdc"
import NonFungibleToken from "../contract/NonFungibleToken.cdc"
import FUSD from "../contract/FUSD.cdc"
import ArtContract from "../contract/ArtContract.cdc"


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
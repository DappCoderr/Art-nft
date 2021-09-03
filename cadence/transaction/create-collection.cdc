import ArtContract from "../contracts/ArtContract.cdc"

transaction(){
    prepare(signer: AuthAccount) {
        let collection <- ArtContract.createEmptyCollection() as! @ArtContract.Collection
        signer.save(<-collection, to:/storage/ArtCollection)
        signer.link<&{ArtContract.ArtPublicCollection}>(/public/ArtPublicCollection, target:/storage/ArtCollection)
    }
}
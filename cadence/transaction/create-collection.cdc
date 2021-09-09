import ArtNFT from 0x7cf57145fba43437

transaction {
  prepare(signer: AuthAccount) {
    let collection <- ArtNFT.createEmptyCollection()
    signer.save<@ArtNFT.Collection>(<-collection, to: /storage/CollectionStoragePath)
    signer.link<&{ArtNFT.ArtCollectionPublic}>(/public/CollectionPublicPath, target: /storage/CollectionStoragePath)
  }
}
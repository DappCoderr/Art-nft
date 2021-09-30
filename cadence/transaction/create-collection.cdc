import ArtNFT from 0x1e890cc216ff88c3

transaction {
  prepare(signer: AuthAccount) {
    let collection <- ArtNFT.createEmptyCollection()
    signer.save<@ArtNFT.Collection>(<-collection, to: /storage/CollectionStoragePath)
    signer.link<&{ArtNFT.ArtCollectionPublic}>(/public/CollectionPublicPath, target: /storage/CollectionStoragePath)
  }
}
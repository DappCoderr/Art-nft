import ArtNFT from "../contract/ArtNFT.cdc"

transaction {
  prepare(acct: AuthAccount) {
    let collection <- ArtNFT.createEmptyCollection()
    acct.save<@ArtNFT.Collection>(<-collection, to: /storage/CollectionStoragePath)
    acct.link<&{ArtNFT.CollectionPublic}>(/public/CollectionPublicPath, target: /storage/CollectionStoragePath)
  }
}
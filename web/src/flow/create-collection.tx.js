export const CREATE_COLLECTION = `
import ArtNFT from 0x57022d35312793f9

transaction {
  prepare(signer: AuthAccount) {
    let collection <- ArtNFT.createEmptyCollection()
    signer.save<@ArtNFT.Collection>(<-collection, to: /storage/CollectionStoragePath)
    signer.link<&{ArtNFT.ArtCollectionPublic}>(/public/CollectionPublicPath, target: /storage/CollectionStoragePath)
  }
}
`
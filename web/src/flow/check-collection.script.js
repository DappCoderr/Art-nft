export const CHECK_COLLECTION = `
    import ArtNFT from 0x7cf57145fba43437
  
    pub fun main(addr: Address): Bool {
        let ref = getAccount(addr).getCapability<&{ArtNFT.ArtCollectionPublic}>(/public/CollectionPublicPath).check()
        return ref
    }
`
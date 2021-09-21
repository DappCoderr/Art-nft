export const CHECK_COLLECTION = `
    import ArtNFT from 0x57022d35312793f9
  
    pub fun main(addr: Address): Bool {
        let ref = getAccount(addr).getCapability<&{ArtNFT.ArtCollectionPublic}>(/public/CollectionPublicPath).check()
        return ref
    }
`
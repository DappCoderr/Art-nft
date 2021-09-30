import ArtNFT from 0x1e890cc216ff88c3
  
  pub fun main(addr: Address): Bool {
    let ref = getAccount(addr).getCapability<&{ArtNFT.ArtCollectionPublic}>(/public/CollectionPublicPath).check()
    return ref
  }
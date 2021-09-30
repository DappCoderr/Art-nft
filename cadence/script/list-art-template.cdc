import ArtNFT from 0x1e890cc216ff88c3

pub fun main(): {UInt64: ArtNFT.Art} {
  let templates = ArtNFT.listArts()
  return templates
}
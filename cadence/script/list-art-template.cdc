import ArtNFT from "../contract/ArtNFT.cdc"

pub fun main(): {UInt32: ArtNFT.Art} {
  let templates = ArtNFT.listArts()
  return templates
}
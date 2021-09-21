export const LIST_ART_TEMPLATE = `
import ArtNFT from 0x57022d35312793f9

pub fun main(): {UInt64: ArtNFT.Art} {
  let templates = ArtNFT.listArts()
  return templates
}
`
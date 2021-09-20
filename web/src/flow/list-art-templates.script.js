export const LIST_ART_TEMPLATE = `
import ArtNFT from 0x7cf57145fba43437

pub fun main(): {UInt64: ArtNFT.Art} {
  let templates = ArtNFT.listArts()
  return templates
}
`
import FungibleToken from "../contract/FungibleToken.cdc"
import ArtNFT from "../contract/ArtNFT.cdc"

pub fun main(addr: Address): {UInt64: ArtNFT.Art} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{ArtNFT.CollectionPublic}>(ArtNFT.CollectionPublicPath).borrow() ?? panic("Cannot borrow reference")
  let arts = ref.listArts()
  return arts
}
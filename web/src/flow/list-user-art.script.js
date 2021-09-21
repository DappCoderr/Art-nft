export const LIST_USER_ARTS = `
import FungibleToken from 0x9a0766d93b6608b7
import ArtNFT from 0x57022d35312793f9

pub fun main(addr: Address): {UInt64: ArtNFT.Art} {
  let account = getAccount(addr)
  let ref = account.getCapability<&{ArtNFT.CollectionPublic}>(ArtNFT.CollectionPublicPath).borrow() ?? panic("Cannot borrow reference")
  let arts = ref.listArts()
  return arts
}
  }
`
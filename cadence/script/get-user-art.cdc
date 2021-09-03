import FungibleToken from "../contract/FungibleToken.cdc"
import ArtContract from "../contract/ArtContract.cdc"

pub fun main(address: Address): {UInt64: ArtContract.MetaData} {
    let account = getAccount(address)
    let ref = account.getCapability<&{ArtContract.ArtPublicCollection}>(/storage/ArtCollection)
                .borrow() ?? panic("cannot borrow refrence")
    
    let art = ref.listArt()
    return art
}
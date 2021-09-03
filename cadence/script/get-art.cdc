import FungibleToken from "../contract/FungibleToken.cdc"
import ArtContract from "../contract/ArtContract.cdc"

pub fun main(id:UInt64, address:Address): [UInt64] {
    let account = getAccount(address)
    let capability = account.getCapability(/public/ArtPublicCollection)
    let ref = capability.borrow<&{ArtContract.ArtPublicCollection, NonFungibleToken.CollectionPublic}>() 
        ?? panic("Could not borrow Art refrence")

    return ref.borrowArt(id:id)
}

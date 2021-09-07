import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export const GET_ART = `
import FungibleToken from 0xFUNGIBLETOKEN
import ArtContract from 0XARTCONTRACT

pub fun main(id:UInt64, address:Address): [UInt64] {
    let account = getAccount(address)
    let capability = account.getCapability(/public/ArtPublicCollection)
    let ref = capability.borrow<&{ArtContract.ArtPublicCollection, NonFungibleToken.CollectionPublic}>() 
        ?? panic("Could not borrow Art refrence")

    return ref.borrowArt(id:id)
}   
`;

export async function getArt(arts) {
    return await fcl
      .send([
        fcl.script(GET_ART),
        fcl.args([
          fcl.arg(id, t.UInt64),
          fcl.arg(address, t.Address),
        ]),
      ])
      .then(fcl.decode);
  }


  export async function getBalance(user) {
    return await fcl
    .send([
      fcl.script`
        import FungibleToken from 0xFUNGIBLETOKEN
        import FUSD from 0xFUSDTOKEN
        
        pub fun main(account: Address): UFix64 {
        
            let vaultRef = getAccount(account)
                .getCapability(/public/fusdBalance)
                .borrow<&FUSD.Vault{FungibleToken.Balance}>()
                ?? panic("Could not borrow Balance reference to the Vault")
        
            return vaultRef.balance
        }
      `,
      fcl.args([
        fcl.arg(user.addr, t.Address), 
      ]),
    ])
    .then(fcl.decode);
  }


  export async function getUserHaikus(user) {
    return await fcl
    .send([
      fcl.script`
      import NonFungibleToken from 0xNONFUNGIBLETOKEN
      import ArtContract from 0XARTCONTRACT
        
      pub fun main(address: Address): {UInt64: ArtContract.MetaData} {
        let account = getAccount(address)
        let ref = account.getCapability<&{ArtContract.ArtPublicCollection}>(/storage/ArtCollection)
                    .borrow() ?? panic("cannot borrow refrence")
        
        let art = ref.listArt()
        return art
    }
      `,
      fcl.args([
        fcl.arg(user.addr, t.Address), 
      ]),
    ])
    .then(fcl.decode);
  }
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

export async function getArt(arts) {
    return await fcl
      .send([
        fcl.script(`
        import FungibleToken from 0xFUNGIBLETOKEN
        import ArtNFT from 0XARTNFT

        pub fun main(id:UInt64, address:Address): [UInt64] {
          let account = getAccount(address)
          let capability = account.getCapability(/public/ArtPublicCollection)
          let ref = capability.borrow<&{ArtNFT.ArtPublicCollection, NonFungibleToken.CollectionPublic}>() 
            ?? panic("Could not borrow Art refrence")

          return ref.borrowArt(id:id)
        }
        `),
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


  export async function getUserArt(user) {
    return await fcl
    .send([
      fcl.script`
      import NonFungibleToken from 0xNONFUNGIBLETOKEN
      import ArtNFT from 0XARTNFT
        
      pub fun main(address: Address): {UInt64: ArtNFT.MetaData} {
        let account = getAccount(address)
        let ref = account.getCapability<&{ArtNFT.ArtPublicCollection}>(/storage/ArtCollection)
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
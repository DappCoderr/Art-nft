import FungibleToken from 0xFUNGIBLETOKENADDRESS
import FUSD from 0xFUSDADDRESS
      
    pub fun main(account: Address): UFix64 {
    let vaultRef = getAccount(account).getCapability(/public/fusdBalance).borrow<&FUSD.Vault{FungibleToken.Balance}>()
              ?? panic("Could not borrow Balance reference to the Vault")
    return vaultRef.balance
    }
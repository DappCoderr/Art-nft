import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68
  
  transaction {
    prepare(signer: AuthAccount) {
        let vaultRef <- signer.load<@FUSD.Vault>(from: /storage/fusdVault) 
            ?? panic("Could not borrow vault reference")
        destroy vaultRef
        signer.unlink(/public/fusdReceiver)
        signer.unlink(/public/fusdBalance)
    }
  }
  
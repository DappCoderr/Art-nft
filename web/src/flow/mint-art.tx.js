export const MINT_ART = `
import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68
import ArtNFT from 0x57022d35312793f9


transaction(artID: UInt64, amount: UFix64) {
  let receiverReference: &ArtNFT.Collection{ArtNFT.Receiver}
  let sentVault: @FungibleToken.Vault

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&ArtNFT.Collection>(from: ArtNFT.CollectionStoragePath) ?? panic("Cannot borrow")
    let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD vault")
    self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    let newArt <- ArtNFT.mintArt(artID: artID, paymentVault: <-self.sentVault)
    self.receiverReference.deposit(token: <-newArt)
  }
}
`
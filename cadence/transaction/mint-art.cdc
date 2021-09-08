import FungibleToken from "../contracts/FungibleToken.cdc"
import FUSD from "../contracts/FUSD.cdc"
import ArtNFT from "../contract/ArtNFT.cdc"


transaction(artID: UInt32, amount: UFix64) {
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
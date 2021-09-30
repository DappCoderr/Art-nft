// import FungibleToken from 0x9a0766d93b6608b7
// import FUSD from 0x7cf57145fba43437
import ArtNFT from 0x1e890cc216ff88c3


transaction(artID: UInt64) {
  let receiverReference: &ArtNFT.Collection{ArtNFT.Receiver}
  // let sentVault: @FungibleToken.Vault

  prepare(acct: AuthAccount) {
    self.receiverReference = acct.borrow<&ArtNFT.Collection>(from: /storage/CollectionStoragePath) ?? panic("Cannot borrow")
    // let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD vault")
    // self.sentVault <- vaultRef.withdraw(amount: amount)
  }

  execute {
    let newArt <- ArtNFT.mintArt(artID: artID)
    self.receiverReference.deposit(token: <-newArt)
  }
}
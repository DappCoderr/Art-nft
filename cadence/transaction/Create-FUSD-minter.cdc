import FUSD from "../contracts/FUSD.cdc"

transaction {
  prepare (signer: AuthAccount) {
    let adminRef = signer.borrow<&FUSD.Administrator>(from: FUSD.AdminStoragePath) ?? panic("Could not borrow reference")
    signer.save(<- adminRef.createNewMinter(), to: /storage/fusdMinter)
  }
}
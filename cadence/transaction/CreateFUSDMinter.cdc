import FUSD from 0xe223d8a629e49c68

transaction {
  prepare (acct: AuthAccount) {
    let adminRef = acct.borrow<&FUSD.Administrator>(from: FUSD.AdminStoragePath)! ?? panic("Could not borrow reference")
    acct.save(<- adminRef.createNewMinter(), to: /storage/fusdMinter)
  }
}
import * as fcl from "@onflow/fcl"

fcl.config()
  .put("accessNode.api", "https://access-testnet.onflow.org")
  .put("challenge.handshake", "https://flow-wallet-testnet.blocto.app/authn")
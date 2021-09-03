import NonFungibleToken from "./NonFungibleToken"
import FUSD from "./FUSD.cdc"
import FungibleToken from "./FungibleToken"

pub contract ArtContract{

    pub var data: {UInt64: MetaData}

    pub var totalSupply: UInt64
    pub var nextArtID: UInt64

    pub event ContractInitialized()
    pub event Withdraw(id:UInt64, from:Address)
    pub event Deposit(id:UInt64, to:Address)

    pub struct MetaData{
        pub let artID: UInt64
        pub let name: String
        pub let imageURL: String
        pub let description: String

        init(name:String, imageURL:String, description:String){
            self.artID = ArtContract.nextArtID
            self.name = name 
            self.imageURL = imageURL
            self.description = description
            ArtContract.nextArtID = ArtContract.nextArtID + 1
        }}

        pub resource Art: NonFungibleToken.INFT{
            pub let id: UInt64
            pub let data: MetaData

            init(artID:UInt64){
                let art = ArtContract.data[artID]!
                self.id = ArtContract.totalSupply
                self.data = MetaData(name: art.name, imageURL: art.imageURL, description: art.description)
            }
        }


        pub resource interface ArtPublicCollection{

            pub fun borrowArt(id: UInt64): &ArtContract.Art

            pub fun deposit(token: @NonFungibleToken.NFT)
            pub fun getIDs(): [UInt64]
            pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        }

        pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ArtPublicCollection {
            pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

            init(){
                self.ownedNFTs <- {}
            }

            pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT{
                let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("Cannot withdraw, Art does not exit")
                emit Withdraw(id: token.id, from: self.owner?.address)
                return <- token
            }

            pub fun deposit(token: @NonFungibleToken.NFT) {
                let token <- token as! @ArtContract.Art
                let id: UInt64 = token.id
                let oldToken <- self.ownedNFTs[id] <- token
                emit Deposit(id: token.id, to: self.owner?.address)
            }

            pub fun getIDs(): [UInt64] {
                return self.ownedNFTs.keys
            }

            pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
                return &self.ownedNFTs[id] as &NonFungibleToken.NFT
            }

            pub fun borrowArt(id: UInt64): &ArtContract.Art {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &ArtContract.Art
            }

            destroy() {
                destroy self.ownedNFTs
            }
        }

        pub fun createEmptyCollection(): @NonFungibleToken.Collection {
            return <- create ArtContract.Collection()
        }

        pub fun listArt() {}

        pub fun mintArt(recipient: &{ArtContract.ArtPublicCollection}, vault:@FungibleToken.Vault, artID:UInt64) {

            pre{
                id == ArtContract.totalSupply: "The given id has already minted"
            }
            var newArt <- create Art(artID:artID)
            recipient.deposit(token: <- newArt)
            ArtContract.totalSupply = ArtContract.totalSupply + 1 as UInt64
        }
    
    init() {
        self.totalSupply = 0 as UInt64
        self.nextArtID = 1 as UInt64
        self.data = {}

        self.account.save<@Collection>(<-create Collection(), to:/storage/ArtCollection)
        self.account.link<&{ArtPublicCollection}>(/public/ArtPublicCollection, target: /storage/ArtCollection)
        emit ContractInitialized()
    }
    
}
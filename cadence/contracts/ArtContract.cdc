import NonFungibleToken from 0x631e88ae7f1d7c20
import FUSD from 0xe223d8a629e49c68
import FungibleToken from 0x9a0766d93b6608b7

pub contract ArtContract: NonFungibleToken {

    pub var data: {UInt64: MetaData}

    pub var totalSupply: UInt64
    pub var nextArtID: UInt64

    pub event ContractInitialized()
    pub event Withdraw(id:UInt64, from: Address?)
    pub event Deposit(id:UInt64, to: Address?)

    pub struct MetaData{
        pub let artID: UInt64
        pub let name: String
        pub let imageURL: String
        pub let price: UFix64
        pub let description: String

        init(name:String, imageURL:String, price:UFix64, description:String){
            self.artID = ArtContract.nextArtID
            self.name = name 
            self.imageURL = imageURL
            self.price = price
            self.description = description
            ArtContract.nextArtID = ArtContract.nextArtID + 1
        }}

        pub resource NFT: NonFungibleToken.INFT{
            pub let id: UInt64
            pub let data: MetaData

            init(artID:UInt64, data: MetaData){
                let art = ArtContract.data[artID]!
                self.id = ArtContract.totalSupply
                self.data = data
            }
        }


        pub resource interface ArtPublicCollection{
            pub fun borrowArt(id: UInt64): &ArtContract.NFT
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
                let token <- token as! @ArtContract.NFT
                let id: UInt64 = token.id
                let oldToken <- self.ownedNFTs[id] <- token
                emit Deposit(id: id, to: self.owner?.address)
                destroy oldToken
            }

            pub fun getIDs(): [UInt64] {
                return self.ownedNFTs.keys
            }

            pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
                return &self.ownedNFTs[id] as &NonFungibleToken.NFT
            }

            pub fun borrowArt(id: UInt64): &ArtContract.NFT {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &ArtContract.NFT
            }

            destroy() {
                destroy self.ownedNFTs
            }
        }

        pub fun createEmptyCollection(): @NonFungibleToken.Collection {
            return <- create ArtContract.Collection()
        }

        pub fun mintArt(recipient: &{ArtContract.ArtPublicCollection}, vault:@FungibleToken.Vault, artID:UInt64, name:String, imageURL:String, price:UFix64, description:String) {

            pre{
                artID == ArtContract.totalSupply: "The given id has already minted"
                vault.balance >= self.data[artID]!.price : "Could not mint art: have insufficient balance."
            }
            var newArt <- create ArtContract.NFT(artID:artID, data:MetaData(name:name, imageURL:imageURL, price:price, description:description))
            recipient.deposit(token: <- newArt)
            ArtContract.totalSupply = ArtContract.totalSupply + 1 as UInt64
            destroy vault
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
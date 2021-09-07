import FungibleToken from 0x01
import NonFungibleToken from 0x02
import FUSD from 0x03

pub contract ArtNFT: NonFungibleToken {
  
  pub var totalSupply: UInt64
  pub var nextArtId: UInt64

  pub var artDatas: {UInt64: Art}

  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)

  pub struct Art {
    pub let name: String
    pub let description: String
    pub let imageURL: String
    pub let price: UFix64

    init(name:String,description:String,imageURL:String,price:UFix64) {
      self.name = name
      self.description = description
      self.imageURL = imageURL
      self.price = price

      ArtNFT.nextArtId = ArtNFT.nextArtId + 1 as UInt64
    }
  }

  pub resource NFT: NonFungibleToken.INFT {
    pub let id: UInt64
    pub let data: Art

    init(initID: UInt64, data:Art) {
      self.id = initID
      self.data = data
    }
  }

  pub struct ArtData {
    pub let id: UInt64
    pub let data: ArtNFT.Art

    init(data:ArtNFT.Art,id:UInt64){
      self.id=id
      self.data=data
    }
  }

  pub resource interface ArtCollectionPublic {
    pub fun deposit(token: @NonFungibleToken.NFT)
    pub fun getIDs(): [UInt64]
    pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
  }

  pub resource Collection: NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ArtCollectionPublic {
      
      pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}
      init () {
        self.ownedNFTs <- {}
      }

      pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
          let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")
          emit Withdraw(id: token.id, from: self.owner?.address)
          return <-token
      }

      pub fun deposit(token: @NonFungibleToken.NFT) {
        let token <- token as! @ArtNFT.NFT
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

      pub fun listDappies(): {UInt64: Art} {
        var templates: {UInt64:Art} = {}
        for key in self.ownedNFTs.keys {
          let ref = &self.ownedNFTs[key] as auth &NonFungibleToken.NFT
          let ref1 = ref as! &ArtNFT.NFT
          templates.insert(key: ref1.id, ref1.data)
        }
        return templates
      }

      destroy(){
        destroy self.ownedNFTs
      }
  }

  pub fun getArtName(id:UInt64): String? {
    return self.artDatas[id]?.name
  }

  pub fun getArtDescription(id:UInt64): String? {
    return self.artDatas[id]?.description
  }

  pub fun createEmptyCollection(): @NonFungibleToken.Collection {
    return <- create ArtNFT.Collection()
  }

  pub fun mintArt(recipient: &{ArtNFT.ArtCollectionPublic},artistName:String,artDescription:String,imageURL:String,price:UFix64) {
    var newNFT <- create NFT(initID:ArtNFT.totalSupply,data:Art(name:artistName, description:artDescription, imageURL:imageURL, price:price))
    recipient.deposit(token: <-newNFT)
    ArtNFT.totalSupply = ArtNFT.totalSupply +  1 as UInt64
  }


  init(){
    self.totalSupply = 0 as UInt64
    self.nextArtId = 0 as UInt64
    self.artDatas = {}

    self.account.save<@Collection>(<-create Collection(), to: /storage/ArtCollection)
    self.account.link<&{ArtCollectionPublic}>(/public/ArtPublicCollection, target: /storage/ArtCollection)
    emit ContractInitialized()
  }
}
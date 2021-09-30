import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 0xe223d8a629e49c68

pub contract ArtNFT {
  
  pub var totalSupply: UInt64
  pub var nextArtId: UInt64

  pub var artDatas: {UInt64: Art}

  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)

  pub struct Art {
    pub let artID: UInt64
    pub let name: String
    pub let description: String
    pub let imageURL: String
    pub let price: UFix64

    init(artID:UInt64,name:String,description:String,imageURL:String,price:UFix64) {
      self.artID = artID
      self.name = name
      self.description = description
      self.imageURL = imageURL
      self.price = price
    }
  }

  pub resource NFT {
    pub let id: UInt64
    pub let data: Art

    init(artID:UInt64) {
      let art = ArtNFT.artDatas[artID]!
      ArtNFT.totalSupply = ArtNFT.totalSupply + 1 as UInt64
      self.id = ArtNFT.totalSupply
      self.data = Art(artID:artID,name:art.name,description:art.description,imageURL:art.imageURL,price:art.price)
    }
  }

  pub resource Admin {
    pub fun createArt(name:String,description:String,imageURL:String,price:UFix64): UInt64 {
      let newArtID = ArtNFT.nextArtId
      ArtNFT.artDatas[newArtID] = Art(artID:newArtID, name:name, description:description, imageURL: imageURL, price:price)
      ArtNFT.nextArtId = ArtNFT.nextArtId + 1 as UInt64
      return newArtID
    }
  }

  pub resource interface ArtCollectionPublic {
    pub fun deposit(token: @NFT)
    pub fun getIDs(): [UInt64]
    pub fun listArts(): {UInt64: Art}
  }

  pub resource interface Provider {
    pub fun withdraw(withdrawID: UInt64): @NFT
  }

  pub resource interface Receiver{
    pub fun deposit(token: @NFT)
  }

  pub resource Collection: Provider,Receiver, ArtCollectionPublic {
      
      pub var ownedNFTs: @{UInt64: NFT}
      init () {
        self.ownedNFTs <- {}
      }

      pub fun withdraw(withdrawID: UInt64): @NFT {
          let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")
          emit Withdraw(id: token.id, from: self.owner?.address)
          return <-token
      }

      pub fun deposit(token: @NFT) {
        let token <- token as @ArtNFT.NFT
        let id: UInt64 = token.id
        let oldToken <- self.ownedNFTs[id] <- token
        emit Deposit(id: id, to: self.owner?.address)
        destroy oldToken
      }

      pub fun getIDs(): [UInt64] {
        return self.ownedNFTs.keys
      }

      pub fun borrowNFT(id: UInt64): &NFT {
        return &self.ownedNFTs[id] as &NFT
      }

      pub fun listArts(): {UInt64: Art} {
        var templates: {UInt64:Art} = {}
        for key in self.ownedNFTs.keys {
          let ref = &self.ownedNFTs[key] as auth &NFT
          let ref1 = ref as &ArtNFT.NFT
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

  pub fun createEmptyCollection(): @Collection {
    return <- create ArtNFT.Collection()
  }

    pub fun mintArt(artID: UInt64): @ArtNFT.NFT {
    pre {
      self.artDatas[artID] != nil : "Could not mint Art: Art with given ID does not exist."
      // paymentVault.balance >= self.artDatas[artID]!.price : "Could not mint Art: payment balance insufficient."
    }
    // destroy paymentVault
    return <- create NFT(artID: artID)
  }

  pub fun listArts(): {UInt64: Art} {
    return self.artDatas
  }


  init(){
    self.totalSupply = 0 as UInt64
    self.nextArtId = 1 as UInt64
    self.artDatas = {}

    self.account.save<@Collection>(<-create Collection(), to: /storage/CollectionStoragePath)
    self.account.link<&{ArtCollectionPublic}>(/public/CollectionPublicPath, target: /storage/CollectionStoragePath)
    self.account.save<@Admin>(<-create Admin(), to: /storage/AdminStoragePath)
    emit ContractInitialized()
  }
}
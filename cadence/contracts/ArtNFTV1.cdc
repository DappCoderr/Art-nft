
import FungibleToken from 0x9a0766d93b6608b7

pub contract ArtNFTV1 {
  access(self) var templates: {UInt64: Template}
  
  pub var nextTemplateID: UInt64
  pub var totalSupply: UInt64
  
  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath

  pub struct Template {
    pub let templateID: UInt64
    pub let name: String
    pub let price: UFix64

    init(templateID: UInt64, name: String, price: UFix64) {
      self.templateID = templateID
      self.name = name
      self.price = price
    }
  }

  pub resource Art {
    pub let id: UInt64
    pub let data: Template

    init(templateID: UInt64) {
      pre {
        ArtNFTV1.templates[templateID] != nil : "Could not create art: template does not exist."
      }
      let art = ArtNFTV1.templates[templateID]!
      ArtNFTV1.totalSupply = ArtNFTV1.totalSupply + 1
      self.id = ArtNFTV1.totalSupply
      self.data = Template(templateID: templateID, name: art.name, price: art.price)
    }
  }

  pub resource Admin {
    pub fun createTemplate(name: String, price: UFix64): UInt64 {
      pre {
        name.length > 0 : "Could not create template: name is required."
      }
      let newArtID = ArtNFTV1.nextTemplateID
      ArtNFTV1.templates[newArtID] = Template(templateID: newArtID, name: name, price: price) 
      ArtNFTV1.nextTemplateID = ArtNFTV1.nextTemplateID + 1
      return newArtID
    }

    pub fun destroyTemplate(artID: UInt64) {
      pre {
        ArtNFTV1.templates[artID] != nil : "Could not delete template: template does not exist."
      }
      ArtNFTV1.templates.remove(key: artID)
    }
  }

  pub resource interface CollectionPublic {
    pub fun deposit(token: @Art)
    pub fun getIDs(): [UInt64]
    pub fun listArts(): {UInt64: Template}
  }

  pub resource interface Provider {
    pub fun withdraw(withdrawID: UInt64): @Art
  }

  pub resource interface Receiver{
    pub fun deposit(token: @Art)
    pub fun batchDeposit(collection: @Collection)
  }

  pub resource Collection: CollectionPublic, Provider, Receiver {
    pub var ownedArts: @{UInt64: Art}

    pub fun withdraw(withdrawID: UInt64): @Art {
      let token <- self.ownedArts.remove(key: withdrawID) 
        ?? panic("Could not withdraw art: art does not exist in collection")
      return <-token
    }

    pub fun deposit(token: @Art) {
      let oldToken <- self.ownedArts[token.id] <- token
      destroy oldToken
    }

    pub fun batchDeposit(collection: @Collection) {
      let keys = collection.getIDs()
      for key in keys {
        self.deposit(token: <-collection.withdraw(withdrawID: key))
      }
      destroy collection
    }

    pub fun getIDs(): [UInt64] {
      return self.ownedArts.keys
    }

    pub fun listArts(): {UInt64: Template} {
      var artTemplates: {UInt64:Template} = {}
      for key in self.ownedArts.keys {
        let el = &self.ownedArts[key] as &Art
        artTemplates.insert(key: el.id, el.data)
      }
      return artTemplates
    }

    destroy() {
      destroy self.ownedArts
    }

    init() {
      self.ownedArts <- {}
    }
  }

  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }

  pub fun mintArt(templateID: UInt64): @Art {
    pre 
    {
      self.templates[templateID] != nil : "Could not mint art: art with given ID does not exist."
    }
    return <- create Art(templateID: templateID)
  }

  pub fun listTemplates(): {UInt64: Template} {
    return self.templates
  }

  init() {
    self.templates = {}
    self.totalSupply = 0
    self.nextTemplateID = 1
    self.CollectionStoragePath = /storage/ArtV1Collections
    self.CollectionPublicPath = /public/ArtV1CollectionPublics
    self.AdminStoragePath = /storage/ArtV1Admins
    self.account.save<@Admin>(<- create Admin(), to: self.AdminStoragePath)
  }
}
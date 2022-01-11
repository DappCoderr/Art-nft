import FungibleToken from 0x9a0766d93b6608b7

pub contract ArtNFTV1 {
  access(self) var templates: {UInt64: Template}

  // Events
  //
  pub event ContractInitialized()
  pub event Withdraw(id: UInt64, from: Address?)
  pub event Deposit(id: UInt64, to: Address?)
  
  //next template ID of the Art struct
  pub var nextTemplateID: UInt64
  //total supply of the Art
  pub var totalSupply: UInt64

  //Named Path
  pub let CollectionStoragePath: StoragePath
  pub let CollectionPublicPath: PublicPath
  pub let AdminStoragePath: StoragePath
  
  //Art Template as structure
  pub struct Template {
    pub let templateID: UInt64
    pub let name: String
    pub let price: UFix64

    //initializing the variables 
    init(templateID: UInt64, name: String, price: UFix64) {
      self.templateID = templateID
      self.name = name
      self.price = price
    }
  }


  //Art as resource
  //that will provide the ownership
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


  // Admin Resource
  // Resource that an admin or something similar would own to be
  // able to create template using template structure and 
  // can destrouy the template
  pub resource Admin {
    pub fun createTemplate(name: String, price: UFix64): UInt64 {
      //pre conditions
      //check the name feild is not empty
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


  // This is the interface that users can cast their Art Collection as
  // to allow others to deposit Art into their Collection. It also allows for reading
  // the details of Art in the Collection.
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

  // Collection
  // A collection of Art NFTs owned by an account
  //
  pub resource Collection: CollectionPublic, Provider, Receiver {

    // dictionary of NFT conforming tokens
    // NFT is a resource type with an `UInt64` ID field
    pub var ownedArts: @{UInt64: Art}


    // withdraw
    // Removes an NFT from the collection and moves it to the caller
    pub fun withdraw(withdrawID: UInt64): @Art {
      let token <- self.ownedArts.remove(key: withdrawID) 
        ?? panic("Could not withdraw art: art does not exist in collection")
      emit Withdraw(id: token.id, from: self.owner?.address)
      return <-token
    }


    // deposit
    // Takes a NFT and adds it to the collections dictionary
    // and adds the ID to the id array
    pub fun deposit(token: @Art) {
      let oldToken <- self.ownedArts[token.id] <- token
      emit Deposit(id: id, to: self.owner?.address)
      destroy oldToken
    }


    //multiple deposit
    //adds multiple NFTs to the collections dictionary
    pub fun batchDeposit(collection: @Collection) {
      let keys = collection.getIDs()
      for key in keys {
        self.deposit(token: <-collection.withdraw(withdrawID: key))
      }
      destroy collection
    }

    // returns array of all the NFT ID in the 
    // collection
    pub fun getIDs(): [UInt64] {
      return self.ownedArts.keys
    }

    // list Arts
    // return all the created on-chain template
    pub fun listArts(): {UInt64: Template} {
      var artTemplates: {UInt64:Template} = {}
      for key in self.ownedArts.keys {
        let el = &self.ownedArts[key] as &Art
        artTemplates.insert(key: el.id, el.data)
      }
      return artTemplates
    }

    // destructor
    destroy() {
      destroy self.ownedArts
    }

    // initializer
    init() {
      self.ownedArts <- {}
    }
  }


  // createEmptyCollection
  // public function that anyone can call to create a new empty collection 
  // in account storage
  pub fun createEmptyCollection(): @Collection {
    return <-create self.Collection()
  }


  // NFTMinter
  // public function to mint the art
  // able to mint new NFTs
  pub fun mintArt(templateID: UInt64): @Art {
    pre 
    {
      self.templates[templateID] != nil : "Could not mint art: art with given ID does not exist."
    }
    return <- create Art(templateID: templateID)
  }

  // list the templates 
  pub fun listTemplates(): {UInt64: Template} {
    return self.templates
  }


  // initializer
  init() {
    self.templates = {}
    self.totalSupply = 0
    self.nextTemplateID = 1
    self.CollectionStoragePath = /storage/ArtV1Collections
    self.CollectionPublicPath = /public/ArtV1CollectionPublics
    self.AdminStoragePath = /storage/ArtV1Admins
    self.account.save<@Admin>(<- create Admin(), to: self.AdminStoragePath)
    emit ContractInitialized()
  }
}
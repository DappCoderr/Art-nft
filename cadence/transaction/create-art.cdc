import ArtNFT from 0x1e890cc216ff88c3

transaction(name:String,description:String,imageURL:String,price:UFix64) {

    var adminRef: &ArtNFT.Admin

    prepare(signer:AuthAccount){
        self.adminRef = signer.borrow<&ArtNFT.Admin>(from:/storage/AdminStoragePath) ?? panic("Could not borrow admin ref")
    }
    execute{

        self.adminRef.createArt(name:name,description:description,imageURL:imageURL,price:price)
    }
}
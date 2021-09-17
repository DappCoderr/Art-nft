import NFTV1 from 0x7cf57145fba43437

transaction(name:String,price:UFix64) {

    var adminRef: &NFTV1.Admin

    prepare(signer:AuthAccount){
        self.adminRef = signer.borrow<&NFTV1.Admin>(from:/storage/AdminStoragePathV1) ?? panic("Could not borrow admin ref")
    }
    execute{

        self.adminRef.createArt(name:name,price:price)
    }
}
import { mutate } from '@onflow/fcl'
import React from 'react'
import Content from '../components/Content'
import { CREATE_ART } from '../flow/create-art.tx'

const Create = () => { 

    // const [name, setName] = useState("");
    // const [description, setDescription] = useState("");
    // const [url, setURL] = useState("");
    // const [price, setPrice] = useState("");


    // const CreateArt = async (name,description,imageURL,price) => {
    //     try{
    //         let res = await mutate({
    //             cadence: CREATE_ART,
    //             limit: 55,
    //             args: (arg,t) => [arg(name,t.String), arg(description,t.String), arg(imageURL,t.String), arg(price,t.UFix64)]
    //         })
    //         addTx(res)
    //         await tx(res).onceSealed()
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <Content
                title={<><span className="highlight">Create Art</span></>}
            />

            <div className='Minter'>
            <form>
                <h4>Art Name</h4>
                    <input
                        className='nft-input'
                        type="text"
                        placeholder="e.g. My first NFT!"
                        // onChange={(event) => setName(event.target.value)}
                    />
                <h4>Art Description</h4>
                    <input
                        className='nft-input'
                        type="text"
                        placeholder="e.g. Even cooler than cryptokitties ;)"
                        // onChange={(event) => setDescription(event.target.value)}
                    />
                <h4>Image URL</h4>
                    <input
                        className='nft-input'
                        type="text"
                        placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
                        // onChange={(event) => setURL(event.target.value)}
                    />
                <h4>Price</h4>
                    <input
                        className='nft-input'
                        type="text"
                        placeholder="10.0 FUSD"
                        // onChange={(event) => setPrice(event.target.value)}
                    />
            </form>
            <br></br>
            <button className="createArtButton" >Create Art</button>
            </div>
        </>
    )
}

export default Create

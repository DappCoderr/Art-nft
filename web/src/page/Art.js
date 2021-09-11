import React from 'react'
// import {useHistory } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser.hook'
import useAddress from '../hooks/useAddress.hook'
import useArtTemplate from '../hooks/use-art-template.hook'
import Context from '../component/Context'
import ErrorLoadingRenderer from '../component/ErrorLoadingRenderer'
import ArtList from '../component/ArtList'
import "./StyleSheet.css"
// import Nav from '../component/Nav'

const Art = () => {

    const [user, loggedIn, tools] = useCurrentUser()
    const address = useAddress()
    const {data: artTemplate, loading, err} = useArtTemplate()

    // const history = useHistory()

    // const gotoHome = () => {
    //     const path = `/`
    //     history.push(path)
    // }

    return (
        <>
            <div>
                <div className="Heading-LoggedIn">
                    <div className="Logo-LoggedIn">Art NFT</div>
                    {/* <Nav/> */}
                    <div className="LoggedIn">
                        {/* <div className="User-Address">You: {}</div> */}
                        <button className="Header-Buttons" type="button" onClick={() => tools?.logOut()}>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
            <Context
                title={<>ArtNFT</>}
                subtitle={<>Buy unique Art collection</>}
            />
            <ErrorLoadingRenderer loading={loading} error={err}>
                <ArtList art={artTemplate} store />
            </ErrorLoadingRenderer>
        </>
    )
}

export default Art

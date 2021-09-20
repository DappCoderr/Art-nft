import React from 'react'
import { useUser } from '../providers/UserProvider'
import "./ArtCard.css"

export default function ArtCard({ art, store }) {
  const { userArts, mintArt } = useUser()
  const { id, name, description, image, price } = art
  const owned = userArts.some(d => d?.id === art?.id)

  const ArtButton = () => (
    <div
      onClick={() => mintArt(id, price)}
      className="btn btn-bordered btn-light btn-art">
      {parseInt(price)} FUSD
    </div>
  )

  return (
    <div className="art-card__border">
      <div className={`art-card__wrapper ${owned && store && "faded"}`} >
         <img className={`art-card__image`} src={image} alt="Art" />
        <br />
        <h3 className="art-card__title">{name}</h3>
        {/* <p className="art-card__info">{description}</p> */}
      </div>

      {!owned && <ArtButton />}

      {store && owned && <div className="collected">Sold</div>}
    </div >
  )
}

import React from 'react'
import { useUser } from '../providers/UserProvider'
import "./ArtCard.css"

export default function ArtCard({ art, store }) {
  const { userArts, mintArt } = useUser()
  const { id, image, name, rarity, price, type, serialNumber } = art
  const owned = userArts.some(d => d?.id === art?.id)

  const ArtButton = () => (
    <div
      onClick={() => mintArt(id, price)}
      className="btn btn-bordered btn-light btn-art">
      <i className="ri-shopping-cart-fill btn-icon"></i> {parseInt(price)} FUSD
    </div>
  )

  return (
    <div className="art-card__border">
      <div className={`art-card__wrapper ${owned && store && "faded"}`} >
        {type === "Art" ? <img className={`art-card__image ${type === "Art" && "img-large"}`} src={image} alt="Moment" />:
          null
        }
        <br />
        <h3 className="art-card__title">{name}</h3>
        <p className="art-card__info"># {id} {owned && !store && ` / ${serialNumber}`}</p>
        <p className="art-card__info">{rarity}</p>
      </div>

      {!owned && type === "Art" && <ArtButton />}

      {store && owned && <div className="collected">Collected</div>}
    </div >
  )
}

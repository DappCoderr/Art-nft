import React from 'react'
import ArtCard from './ArtCard'
import './ArtList.css'

export default function ArtList({ arts, store }) {

  return (
    <div className="art-list__wrapper">
      {arts.map((art, i) => (
        <ArtCard
          key={i}
          art={art}
          store={store}
        />
      ))
      }
    </div>
  )
}

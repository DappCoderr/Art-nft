import React from 'react'
import ArtList from '../components/ArtList'
import Content from '../components/Content'
import { useUser } from '../providers/UserProvider'


export default function Collection() {
  const { collection, createCollection, deleteCollection, userArts } = useUser()

  return (
    <>
      <Content
        title={<><span className="highlight">My Collection</span></>}
        subtitle={<><span className="highlight">Please enable collection to view your Art</span></>}
      />

      {!collection ?
        <div className="btn btn-round" onClick={() => createCollection()}>Enable Collection</div> :
        <>
          <ArtList arts={userArts} />
          <div className="btn btn-round" onClick={() => deleteCollection()}>Delete Collection</div>
        </>
      }
    </>
  )
}

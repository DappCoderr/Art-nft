import React from 'react'
import Content from '../components/Content'
import "./Home.page.css"

export default function Home() {

  return (
    <>
      <Content
        title={<><span className="highlight">Buy Collect and Trade</span></>}
        subtitle={<><span className="highlight">Unique Art on Flow</span></>}
      />
    </>
  )
}

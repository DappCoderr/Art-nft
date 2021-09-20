import React from 'react'
import useArtTemplates from "../hooks/use-art-templates.hook"
import ArtList from '../components/ArtList'
import Content from '../components/Content'
import ErrorLoadingRenderer from '../components/ErrorLoadingRenderer'

export default function Arts() {
  const { data: artTemplates, loading, error } = useArtTemplates()

  return (
    <>
      <Content
        title={<><span className="highlight">Now Buy Unique Art on Flow</span></>}
      />
      <ErrorLoadingRenderer loading={loading} error={error}>
        <ArtList arts={artTemplates} store />
      </ErrorLoadingRenderer>
    </>
  )
}

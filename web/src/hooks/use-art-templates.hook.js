import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'


export default function useArtTemplates() {
  const [state, dispatch] = useReducer(defaultReducer, { loading: false, error: false, data: [] })

  useEffect(() => {
    const fetchArtTemplates = async () => {
    }
    fetchArtTemplates()
  }, [])

  return state
}


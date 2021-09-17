import { useEffect, useReducer } from 'react'
import { userArtReducer } from '../reducer/userArtReducer'

export default function useUserArts() {
  const [state] = useReducer(userArtReducer, {
    oading: false,
    error: false,
    data: []
  })

  useEffect(() => {
    const fetchUserArts = async () => {
    }
    fetchUserArts()
    //eslint-disable-next-line
  }, [])

  const mintArt = async (templateID, amount) => {
  }

  return {
    ...state,
    mintArt
  }
}
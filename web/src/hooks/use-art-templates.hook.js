  import { useEffect, useReducer } from 'react'
  import { query } from '@onflow/fcl'
  
  import {LIST_ART_TEMPLATE} from "../flow/list-art-templates.script" 
  import { defaultReducer } from '../reducer/defaultReducer'
  // import ArtClass from '../utils/ArtClass' 
  
  export default function useArtTemplates() {
    const [state, dispatch] = useReducer(defaultReducer, { loading: false, error: false, data: [] })
  
    useEffect(() => {
      const fetchArtTemplates = async () => {
        dispatch({ type: 'PROCESSING' })
        try {
          const res = await query({ cadence: LIST_ART_TEMPLATE })
          dispatch({ type: 'SUCCESS', payload: res })
        } catch (err) { 
          dispatch({ type: 'ERROR' })
        }
      }
      fetchArtTemplates()
    }, [])


    // const fetchArtDetails = async (artID) => {
    //   let res = await query({
    //     cadence: GET_ART,
    //     args: (arg, t) => [arg(artID, t.UInt32)]
    //   })
    //   return new Art(res?.artID, res?.name, res?.description)
    // }
  
    return {
      ...state,
      // fetchArtDetails
    }
  }
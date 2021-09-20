  import { useEffect, useReducer } from 'react'
  import { defaultReducer } from '../reducer/defaultReducer'
  import Art from '../utils/ArtClass'

  import { query } from "@onflow/fcl";
  import {LIST_ART_TEMPLATE} from "../flow/list-art-templates.script"
  
  export default function useArtTemplates() {
    const [state, dispatch] = useReducer(defaultReducer, { loading: false, error: false, data: [] })
    
    useEffect(() => {
      const fetchArtTemplates = async () => {
        dispatch({ type: 'PROCESSING' })
        try {
          const res = await query({
            cadence: LIST_ART_TEMPLATE,
          })
          let mapped = Object.values(res).map(d => {return new Art(d?.artID, d?.name, d?.description, d?.imageURL, d?.price)})
          
        dispatch({ type: 'SUCCESS', payload: mapped })
        } catch (err) {
          dispatch({ type: 'ERROR' })
        }
      }
      fetchArtTemplates()
    }, [])

    return state
  }
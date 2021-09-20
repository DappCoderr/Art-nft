import { useEffect, useReducer } from 'react'
import { userArtReducer } from '../reducer/userArtReducer'
import { useTxs } from '../providers/TxProvider'
import Art from '../utils/ArtClass'
import { mutate, query, tx } from '@onflow/fcl'
import {MINT_ART} from '../flow/mint-art.tx'
import {LIST_USER_ARTS} from '../flow/list-user-art.script'

export default function useUserArts(user, collection, getFUSDBalance) {
  const [state, dispatch] = useReducer(userArtReducer, {
    oading: false,
    error: false,
    data: []
  })

  const { addTx, runningTxs } = useTxs()

  useEffect(() => {
    const fetchUserArts = async () => {
      dispatch({type: 'PROCESSING'})
      try{
        let res = await query({
          cadence: LIST_USER_ARTS,
          args: (arg,t) => [arg(user?.addr, t.Address)]
        })
        let mapped = []

        for (let key in res) {
          const element = res[key]
          let art = new Art(element.artID, element.name, element.description, element.imageURL, element.name, key)
          mapped.push(art)
        }

        dispatch({ type: 'SUCCESS', payload: mapped })
      } catch (err) {
        dispatch({ type: 'ERROR' })
      }
    }
    fetchUserArts()
    //eslint-disable-next-line
  }, [])

  const mintArt = async (artID, amount) => {
    if (!collection) {
      alert("You need to enable the collection first. Go to the tab Collection")
      return
    }
    if (runningTxs) {
      alert("Transactions are still running. Please wait for them to finish first.")
      return
    }
    try {
      let res = await mutate({
        cadence: MINT_ART,
        limit: 55,
        args: (arg, t) => [arg(artID, t.UInt64), arg(amount, t.UFix64)]
      })
      addTx(res)
      await tx(res).onceSealed()
      await getFUSDBalance()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    ...state,
    mintArt
  }
}
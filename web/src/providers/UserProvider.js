import React, { createContext, useContext } from 'react'

import useUserArts from '../hooks/use-user-art.hook'
import useCollection from '../hooks/use-collection.hook'
import useFUSD from '../hooks/use-fusd.hook'
import { useAuth } from './AuthProvider'

const UserContext = createContext()

export default function UserProvider({ children }) {
  const { user } = useAuth()
  const { collection, createCollection, deleteCollection } = useCollection(user)
  const { data: balance, createFUSDVault, getFUSDBalance } = useFUSD(user)
  const { data: userArts, mintArt } = useUserArts(user, collection, getFUSDBalance)

  return (
    <UserContext.Provider
      value={{
        userArts,
        mintArt,
        collection,
        createCollection,
        deleteCollection,
        balance,
        createFUSDVault,
        getFUSDBalance
      }}>

      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext)
}
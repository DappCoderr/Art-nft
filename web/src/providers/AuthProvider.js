import React, { createContext, useContext } from 'react'

import useCurrentUser from '../hooks/use-current-user.hook'
import Header from '../components/Content'

const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, loggedIn, tools] = useCurrentUser()

  if (!user || !loggedIn) return (
    <div className='homepage'>
      <Header
        title={<><span className="highlight">Art</span>NFT</>}
        subtitle={<>Please log in with your Blocto testnet wallet.</>}
      />
      <div
        style={{ display: "inline-block" }}
        className="btn btn-bg rounded cw"
        onClick={() => tools?.logIn()}>
        Connect Wallet
      </div>
    </div>
  )

  return (
    <AuthContext.Provider value={{
      user,
      loggedIn,
      ...tools
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

import React, { Suspense } from "react"
import { useCurrentUser } from "../hooks/useCurrentUser"
import HomepageHeader from './Header/HomepageHeader'
import LoggedInHeader from './Header/LoggedInHeader'

export function AuthCluster() {
  const { loggedIn } = useCurrentUser()

  return (
    <div>
      {loggedIn ? <LoggedInHeader /> : <HomepageHeader />}
    </div>
  )
}

export default function WrappedAuthCluster() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthCluster />
    </Suspense>
  )
}

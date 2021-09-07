import React, {useCallback, useEffect, useState, useContext} from "react";
import * as fcl from "@onflow/fcl";
import {getBalance, getUserArt} from "../cadence/scripts";

const UserStateContext = React.createContext();

export function UserStateProvider({children}) {
  const [balance, setBalance] = useState(0);
  const [userArt, setuserArt] = useState({});

  return <UserStateContext.Provider value={{balance, setBalance, userArt, setuserArt}} children={children} />
}

export function useCurrentUser() {
  const [user, setUser] = useState({loggedIn: null});
  const {balance, setBalance, userArt, setuserArt} = useContext(UserStateContext);

  useEffect(() => fcl.currentUser().subscribe(setUser), []);

  const updateBalance = useCallback(async () => {
    try {
      const balance = await getBalance(user);
      setBalance(balance);
    } catch {
      setBalance(null);
    }
  }, [user]);

  useEffect(() => {
    if (user.loggedIn)  {
      updateBalance();
    } else {
      setBalance(0);
    }
  }, [user]);

  useEffect(() => {
    async function getArt() {
      try {
        const Arts = await getUserArt(user);
        setuserArt(Arts);
      } catch {}
    }

    if (user.loggedIn) {
      getArt();
    } else {
      setuserArt({});
    }
  }, [user]);
  
  return {user, balance, updateBalance, userArt, setuserArt};
}

export default useCurrentUser;
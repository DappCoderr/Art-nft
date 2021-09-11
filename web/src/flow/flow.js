import React, {useReducer, useEffect, useCallback} from 'react';
import * as fcl from '@onflow/fcl';
import * as FlowTypes from '@onflow/types';

const Context = React.createContext({});

function reducer(state, action) {
  switch (action.type) {
    case 'setUser': {
      return {
        ...state,
        user: action.payload
      };
    }
    case 'setBalance': {
      return {
        ...state,
        balance: action.payload
      };
    }
    case 'setCollection': {
      if (action.payload) {
        return {
          ...state,
          collection: action.payload
        };
      } else {
        return {
          ...state,
          collection: action.payload
        };
      }
    }
    default:
      return state;
  }
}

function Provider(props) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    balance: null,
    collection: undefined
  });

  const isReady = (
    state.balance !== null &&
    state.collection !== undefined
  );

  const fetchBalance = useCallback(
    async () => {
      if (state.user.addr && state.user.addr !== '0xLocalArtist') {
        // A sample script execution.
        // Query for the account's FLOW token balance.
        const balance = await fcl.send([
          fcl.script`
            import FungibleToken from 0x9a0766d93b6608b7
            import FlowToken from 0x7e60df042a9c0868
  
            pub fun main(address: Address): UFix64 {
              let vaultRef = getAccount(address)
                .getCapability(/public/flowTokenBalance)
                .borrow<&FlowToken.Vault{FungibleToken.Balance}>()
                ?? panic("Could not borrow Balance reference to the Vault");
  
              return vaultRef.balance;
            }
          `,
          fcl.args([
            fcl.arg(state.user.addr, FlowTypes.Address)
          ])
        ]).then(fcl.decode);

        dispatch({type: 'setBalance', payload: balance});
      } else {
        return dispatch({type: 'setBalance', payload: -42});
      }
    },
    [state.user]
  );
  const createCollection = useCallback(
    async () => {
        // TODO: Implement the createCollection transaction using "fcl.send".

        /*
        const transactionId = await fcl
          .send([])
          .then(fcl.decode);
        return fcl.tx(transactionId).onceSealed();
        */
      
        return null;
    },
    []
  );
  const destroyCollection = useCallback(
    async () => {
      // TODO: Implement the destroyCollection.cdc transaction using "fcl.send".

      /*
      const transactionId = await fcl
        .send([])
        .then(fcl.decode);
      return fcl.tx(transactionId).onceSealed();
      */

      return null;
    },
    []
  );

  const setUser = (user) => {
    dispatch({type: 'setUser', payload: user});
  };
  const logIn = () => {
    // TODO: Implement FCL log in.
    // TODO: Once implemented, remove the "setUser" call.
    setUser({
      loggedIn: true,
      addr: '0xLocalArtist'
    });
  };
  const logOut = () => {
    // TODO: Implement FCL log out.
  };

  useEffect(() => {
    // TODO: Implement FCL subscription to get current user.
    // TODO: Once implemented, remove the "setUser" call.
    setUser({
      loggedIn: null
    });
  }, []);

  useEffect(() => {
    if (state.user && state.user.addr) {
      fetchBalance();
    }
  }, [state.user, fetchBalance]);

  return (
    <Context.Provider
      value={{
        state,
        isReady,
        dispatch,
        logIn,
        logOut,
        fetchBalance,
        createCollection,
        destroyCollection,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export {
  Context as default,
  Provider
};
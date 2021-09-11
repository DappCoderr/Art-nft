import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import FlowContext from '../../flow/flow';

function User(props) {
  const flow = useContext(FlowContext);

  if (flow.state.user && flow.state.user.loggedIn) {
    return (
      <div id="User" className="block">
        <div>
          <button className="button" onClick={flow.logOut}> Log Out </button>
        </div>
        <div className="profile">
            <span>
              <Link to={`/account/${flow.state.user.addr}`}>
                You: {flow.state.user.addr}
              </Link>
            </span>
        </div>
      </div>
    );
  } else {
    return (
      <div id="User">
        <div className="buttons">
          <button className="button is-primary" onClick={flow.logIn}> Authenticate </button>
        </div>
      </div>
    );
  }
}

export default User;
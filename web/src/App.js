import {useContext} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import FlowContext, {Provider as FlowContextProvider} from './flow/flow';

import Authenticate from './pages/Authenticate';

import Header from './component/Header/Header';
import Body from './component/Body/Body';
import Footer from './component/Footer/Footer';
import Navigation from './component/Navigation';

import './App.css';

function PrivateRoute(props) {
  const flow = useContext(FlowContext);
  
  if (!flow.isReady) {
    if (flow.state.user && !flow.state.user.loggedIn) {
      return (
        <Redirect to="/authenticate" />
      );
    } else {
      return (
        <div className="notification">
          Loading...
        </div>
      );
    }
  } else if (flow.state.user.loggedIn) {
    return (
      <Route {...props} />
    );
  } else {
    return (
      <Redirect to="/authenticate" />
    );
  }
};

function App() {
  return (
    <div id="App">
      <Header />
      <Switch>
        <Route path="/public">
          <Redirect to="/" />
        </Route>
        <Route path="/account/:address">
          <Body>
            <Account />
          </Body>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

function WrappedApp() {
  return (
    <FlowContextProvider>
      <Router>
        <App />
      </Router>
    </FlowContextProvider>
  );
}

export default WrappedApp;

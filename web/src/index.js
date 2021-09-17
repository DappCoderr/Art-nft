
import React from 'react';
import ReactDOM from 'react-dom';
import Providers from './providers/Providers.comp';
import Routes from './components/Routes.comp'
import { ROUTES } from './config/routes.config';
import "./config/config"
import './index.css';
import './components/Atoms.css'
import Header from "../src/components/Header/Header"

ReactDOM.render(
  <Providers>
    <Header/>
    <Routes routes={ROUTES} />
  </Providers>,
  document.getElementById('root')
);
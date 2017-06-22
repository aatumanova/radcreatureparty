import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Redirect, Route} from 'react-router-dom';

import About from './views/About';
import Artists from './views/Artists';
import CreatureCreator from './views/CreatureCreator';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import PageBody from './components/PageBody';
import PageHeader from './components/PageHeader';
import Page from './components/Page';

import '../scss/index.scss';

ReactDOM.render(
  <Router>
    <Page>
      <PageHeader>
        <Logo />
        <Navigation />
      </PageHeader>
      <PageBody>
        <Route exact path="/" render={() => {
          return <Redirect to="/creature-creator/0/0/0" />;
        }} />
        <Route path="/creature-creator/:headID?/:bodyID?/:bottomID?" component={CreatureCreator} />
        <Route path="/artists" component={Artists} />
        <Route path="/about" component={About} />
      </PageBody>
    </Page>
  </Router>,
  global.document.getElementById('root')
);

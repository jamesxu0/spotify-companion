import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TokenContent from './contexts/token.context';
import HomePage from './pages/HomePage/HomePage';
import StatsPage from './pages/StatsPage/StatsPage';
import MergePage from './pages/MergePage/MergePage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.scss';

function App() {
  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  };
  const token = getHashParams().access_token;
  return token !== undefined ? (
    <div className="App">
      <Switch>
        <TokenContent.Provider value={token}>
          <Route exact path="/" component={HomePage} />
          <Route path="/merge" component={MergePage} />
          <Route path="/stats" component={StatsPage} />
        </TokenContent.Provider>
      </Switch>
    </div>
  ) : (
    <LoginPage />
  );
}

export default App;

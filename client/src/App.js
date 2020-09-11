import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
  if (!sessionStorage.getItem('spotify-companion-access-token')) {
    if (!token) return LoginPage();
    sessionStorage.setItem('spotify-companion-access-token', token);
  }
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/merge" component={MergePage} />
        <Route path="/stats" component={StatsPage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;

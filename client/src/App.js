import React from 'react';
import { useEffect } from 'react';
import './App.scss';

function App() {
  function getHashParams() {
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
  }

  return <div className="App">Hello world</div>;
}

export default App;

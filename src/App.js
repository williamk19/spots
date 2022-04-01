import React, { useState, useEffect } from 'react';
import HomePage from './pages/home/home.page';
import './App.css';
const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.REACT_APP_SPOTIFY_API_KEY}&scope=playlist-modify-private&redirect_uri=http://localhost:3000/`;
const searchUrl = `https://api.spotify.com/v1/search?type=album&include_external=audio`;

const App = () => {

  const [token, setToken] = useState('');
  const [query, setQuery] = useState('');
  const [data, setData] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    let hash = window.location.hash.substring(1);
    let params = {};
    hash.split('&').map(hk => {
      let temp = hk.split('=');
      params[temp[0]] = temp[1];
    });
    setToken(params.access_token);
  });

  const onSelected = (newData) => {
    if (!selected.find(select => select.id === newData.id)) {
      setSelected([...selected, newData]);
    }
  }

  const onDeselect = (removeData) => {
    setSelected(selected.filter((select) => select.id !== removeData.id));
  }

  const onSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const callApi = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(data => setData(data));
  };

  return (
    <div className="App">
      <HomePage
        token={token}
        authUrl={authUrl}
        searchUrl={searchUrl}
        selected={selected}
        data={data}
        query={query}
        onSearchChange={onSearchChange}
        onSelected={onSelected}
        onDeselect={onDeselect}
        callApi={callApi}
      />
    </div>
  );
};

export default App;

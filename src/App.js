import React from 'react';
import HomePage from './pages/home/home.page';
import './App.css';
const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.REACT_APP_SPOTIFY_API_KEY}&scope=playlist-modify-private&redirect_uri=http://localhost:3000/`;
const searchUrl = `https://api.spotify.com/v1/search?type=album&include_external=audio`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      access_token: '',
      searchQuery: '',
      data: {}
    };
  }

  componentDidMount() {
    let hash = window.location.hash.substring(1);
    let params = {};
    hash.split('&').map(hk => {
      let temp = hk.split('=');
      params[temp[0]] = temp[1];
    });
    this.setState({ access_token: params.access_token }, () => {
      console.log(this.state.access_token);
    });
  }

  onSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value }, () => {
      console.log(this.state.searchQuery);
    });
  };

  callApi = (e) => {
    e.preventDefault();
    fetch(`https://api.spotify.com/v1/search?q=${this.state.searchQuery}&type=track`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.state.access_token}`
      },
    })
      .then(res => res.json())
      .then(data => this.setState({ data: data }, () => console.log(this.state.data)));
  };

  render() {
    return (
      <div className="App">
        <HomePage authUrl={authUrl} searchUrl={searchUrl} onSearchChange={this.onSearchChange} callApi={this.callApi} data={this.state.data} />
      </div>
    );
  }
}

export default App;

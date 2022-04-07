import React from 'react';
// import data from '../../data/data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './home.page.css';
import SongComponent from '../../components/song/song.component';
import PlaylistComponent from '../../components/playlist/playlist.component';

const songComponent = ({
  token,
  authUrl,
  onSearchChange,
  callApi,
  data,
  query,
  selected,
  onSelected,
  onDeselect,
  minLength,
  handleDesc,
  handleCreatePlaylist,
}) => {
  const selectedItem = selected.filter((select) => select.name === query);

  return (
    <div className='container'>
      <Router>
        <Switch>
          {/* Create Playlis Route (Protected) */}
          <Route path='/create-playlist'>
            {token ? (
              <>
                <PlaylistComponent
                  minLength={minLength}
                  handleDesc={handleDesc}
                  handleCreatePlaylist={handleCreatePlaylist}
                />
                <input
                  className='input-search'
                  onChange={onSearchChange}
                  type='search'
                />
                <button className='btn-search' onClick={callApi}>
                  SEARCH MUSIC
                </button>
                {selectedItem.map((d) => (
                  <SongComponent
                    key={d.id}
                    data={d}
                    selected={selected}
                    onSelected={onSelected}
                    onDeselect={onDeselect}
                  />
                ))}
                {data?.tracks?.items?.map((d) => (
                  <SongComponent
                    key={d.id}
                    data={d}
                    selected={selected}
                    onSelected={onSelected}
                    onDeselect={onDeselect}
                  />
                ))}
              </>
            ) : (
              <Redirect to='/' />
            )}
          </Route>

          {/* Login Route (Public) */}
          <Route path='/'>
            {token ? (
              <Redirect to='/create-playlist' />
            ) : (
              <>
                <h1 className='header'>Spots Music Playlist</h1>
                <a className='links' href={authUrl}>
                  Sign In With Spotify
                </a>
              </>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(songComponent);

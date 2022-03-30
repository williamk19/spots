import React from 'react';
// import data from '../../data/data';
import './home.page.css';
import SongComponent from '../../components/song/song.component';

const songComponent = ({ authUrl, onSearchChange, callApi, data }) => {
  return (
    <div className='container'>
      <h1 className='header'>Spots Music Playlist</h1>
      <a className='links' href={authUrl}>
        Sign In With Spotify
      </a>
      <input className='input-search' onChange={onSearchChange} type='search' />
      <button className='btn-search' onClick={callApi}>SEARCH MUSIC</button>

      {data?.tracks?.items?.map((d) => (
        <SongComponent key={d.id} data={d} />
      ))}
    </div>
  );
};

export default songComponent;
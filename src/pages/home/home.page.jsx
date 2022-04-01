import React from 'react';
// import data from '../../data/data';
import './home.page.css';
import SongComponent from '../../components/song/song.component';

const songComponent = ({
  authUrl,
  token,
  onSearchChange,
  callApi,
  data,
  query,
  selected,
  onSelected,
  onDeselect
}) => {
  const selectedItem = selected.filter(select => select.name === query);

  return (
    <div className='container'>
      <h1 className='header'>Spots Music Playlist</h1>
      {!token ? (
        <a className='links' href={authUrl}>
          Sign In With Spotify
        </a>
      ) : (
        <a className='links'>
          Sign Out
        </a>
      )}
      <input className='input-search' onChange={onSearchChange} type='search' />
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
    </div>
  );
};

export default songComponent;

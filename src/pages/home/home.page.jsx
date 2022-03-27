import React from 'react';
import data from '../../data/data';
import './home.page.css';
import SongComponent from '../../components/song/song.component';

const songComponent = () => {
  return (
    <div className='container'>
      <h1 className='header'>Spots Music Playlist</h1>
      {data.map((d) => (
        <SongComponent key={d.id} data={d} />
      ))}
    </div>
  );
}

export default songComponent;
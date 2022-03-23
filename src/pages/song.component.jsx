import React from 'react';
import Data from '../data/data';
import './song.component.css';

const songComponent = () => {
  return (
    <div className='container'>
      <h1 className='header'>Track Info</h1>
      <div className='song-container'>
        <img src={`${Data.album.images[0].url}`} alt='Album Images' />
        <h2>{`${Data.name}`}</h2>
        <p>{`${Data.artists[0].name} - ${Data.album.name}`}</p>
        <button>Select</button>
      </div>
    </div>
  );
}

export default songComponent;
import React from 'react';
import Data from '../data/data';
import './song.component.css';
import SongContainer from './song-container/song-container.component';

const songComponent = () => {
  return (
    <div className='container'>
      <h1 className='header'>Track Info</h1>
      <SongContainer Data={Data}/>
    </div>
  );
}

export default songComponent;
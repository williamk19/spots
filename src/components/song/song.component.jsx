import React from 'react';
import './song.component.css';

const songContainer = ({data}) => {
  return (
    <div className='song-container'>
      <img src={`${data.album.images[0].url}`} alt='Album Images' />
      <h2>{`${data.name}`}</h2>
      <p>{`${data.artists[0].name} - ${data.album.name}`}</p>
      <button>Select</button>
    </div>
  );
};

export default songContainer;

import React from 'react';

const songContainer = (props) => {
  return (
    <div className='song-container'>
      <img src={`${props.Data.album.images[0].url}`} alt='Album Images' />
      <h2>{`${props.Data.name}`}</h2>
      <p>{`${props.Data.artists[0].name} - ${props.Data.album.name}`}</p>
      <button>Select</button>
    </div>
  );
};

export default songContainer;

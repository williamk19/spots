import React from 'react';
import './song.component.css';

const songContainer = ({ data, selected, onSelected, onDeselect }) => {
  return (
    <div className='song-container'>
      <img src={`${data.album.images[0].url}`} alt='Album Images' />
      <div className='detail'>
        <h2>{`${data.name}`}</h2>
        <p>{`${data.artists[0].name} - ${data.album.name}`}</p>
        {selected.some((select) => select.id === data.id) ? (
          <button onClick={() => onDeselect(data)}>Deselect</button>
        ) : (
          <button onClick={() => onSelected(data)}>Select</button>
        )}
      </div>
    </div>
  );
};

export default songContainer;

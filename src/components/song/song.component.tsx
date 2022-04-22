import React from 'react';
import './song.component.css';


function duration(ms: number) {
  const minute = Math.floor(ms / 60000);
  const second = Math.round((ms % 60000) / 1000);

  return second === 60
    ? `${minute + 1}:00`
    : `${minute}:${second.toString().padStart(2, '0')}`;
}

type SelectedType = {
  id: number;
};

type GifType = {
  id: number;
  album: {
    images: {
      url: String;
    }[];
    name: String;
  };
  duration_ms: number;
  name: String;
  artists: {
    name: String;
  }[];
};

type Prop = {
  data: GifType;
  selected: SelectedType[];
  onSelected: (data: GifType) => void;
  onDeselect: (data: GifType) => void;
};

const songContainer = ({ data, selected, onSelected, onDeselect }: Prop) => {
  return (
    <div className='song-container'>
      <img
        src={`${data.album.images[0].url}`}
        alt='Album Images'
        data-testid='album-images'
      />
      <div className='detail'>
        <h2>{`${data.name.substring(0, 20)} ${
          data.name.length > 20 ? '...' : ''
        }`}</h2>
        <p>{`${data.artists[0].name.substring(0, 20)} ${
          data.name.length > 20 ? '...' : ''
        } - ${data.album.name.substring(0, 20)} ${
          data.name.length > 20 ? '...' : ''
        }`}</p>
        <p>{`${duration(data.duration_ms)}`}</p>
        {selected.some((select) => select.id === data.id) ? (
          <button data-testid='album-button' onClick={() => onDeselect(data)}>
            Deselect
          </button>
        ) : (
          <button data-testid='album-button' onClick={() => onSelected(data)}>
            Select
          </button>
        )}
      </div>
    </div>
  );
};

export default songContainer;

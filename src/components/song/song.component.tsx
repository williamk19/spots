import React from 'react';
import './song.component.css';

type SelectedType = {
  id: number;
}

type GifType = {
  id: number;
  album: {
    images: {
      url: String;
    }[];
    name: String;
  };
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

const songContainer = (
  { data, selected, onSelected, onDeselect }: Prop
) => {
  console.log(data);

  return (
    <div className='song-container'>
      <img src={`${data.album.images[0].url}`} alt='Album Images' />
      <div className='detail'>
        <h2>{`${data.name.substring(0, 30)} ${
          data.name.length > 30 ? '...' : ''
        }`}</h2>
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

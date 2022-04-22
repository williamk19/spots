import React, { useState } from 'react';
import './playlist.component.css';
import { connect } from 'react-redux';
import { TextField, Button } from '@mui/material';

const playlist = ({ token, user, selected }) => {
  const [listTitle, setListTitle] = useState('');
  const [listDesc, setListDesc] = useState('');

  const minLength = (e) => {
    const { value } = e.target;
    return setListTitle(value);
  };

  const handleDesc = (e) => {
    const { value } = e.target;
    return setListDesc(value);
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (listTitle.length <= 10) {
      alert('Playlist name must be over 10 characters');
    } else {
      let playlistId = await fetch(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          method: 'POST',
          body: JSON.stringify({
            name: `${listTitle}`,
            description: `${listDesc}`,
            public: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => data.id);
      const uris = selected.map((select) => select.uri).join(',');
      alert(`${listTitle} is created on your spotify account`);
      return fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );
    }
  };

  return (
    <>
      <h1>Create Playlist</h1>
      <form>
        <h4 htmlFor='title'>Song Title</h4>
        <TextField
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
          }}
          onChange={minLength}
          id='playlist-name'
          className='input'
          label='Song Title'
          variant='filled'
        />

        <h4 htmlFor='desc'>Song Description</h4>
        <TextField
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
          }}
          onChange={handleDesc}
          id='playlist-desc'
          className='input'
          label='Song Description'
          variant='filled'
        />

        <Button
          sx={{
            marginTop: '2rem',
            padding: '1rem 0',
            backgroundColor: '#768eb5',
            '&:hover': {
              backgroundColor: '#72829c',
            },
          }}
          variant='contained'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            handleCreatePlaylist(e);
            document.getElementById('playlist-name').value = '';
            document.getElementById('playlist-desc').value = '';
          }}
        >
          Create Playlist
        </Button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  user: state.user,
  selected: state.selected
});

export default connect(mapStateToProps)(playlist);

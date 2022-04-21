import React from 'react';
import './playlist.component.css';

import { TextField, Button } from '@mui/material';

const playlist = ({minLength, handleDesc, handleCreatePlaylist}) => {
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
          fullwidth
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
            alert(`${document.getElementById('playlist-name').value} is created on your spotify account`);
            document.getElementById('playlist-name').value = '';
            document.getElementById('playlist-desc').value = '';
          }}
        >
          Create Playlist
        </Button>
      </form>
    </>
  );
}

export default playlist;
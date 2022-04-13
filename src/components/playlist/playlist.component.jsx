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
          id='filled-basic'
          label='Song Title'
          variant='filled'
        />
        {/* <input onChange={minLength} type='text' name='temp' id='title' /> */}
        <h4 htmlFor='desc'>Song Description</h4>
        <TextField
          sx={{
            backgroundColor: 'white',
            borderRadius: '5px',
          }}
          onChange={handleDesc}
          id='filled-basic'
          label='Song Description'
          variant='filled'
        />
        {/* <input onChange={handleDesc} type='text' name='desc' id='desc' /> */}
        <Button
          sx={{
            marginTop: '2rem',
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
            document.getElementById('title').value = '';
            document.getElementById('desc').value = '';
          }}
        >
          Create Playlist
        </Button>
        {/* <input
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            handleCreatePlaylist(e);
            document.getElementById('title').value = '';
            document.getElementById('desc').value = '';
          }}
          value='Create Playlist'
        /> */}
      </form>
    </>
  );
}

export default playlist;
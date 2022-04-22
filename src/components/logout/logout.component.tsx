import React from 'react';
import Button from '@mui/material/Button';

const logoutUrl = 'https://www.spotify.com/logout/';
const isPublish = false;

const logout = () => {
    const spotifyLogoutWindow = window.open(
      logoutUrl,
      'Spotify Logout',
      'width=700,height=500,top=0,left=0'
    );
    window.location.replace(
      `${
        isPublish
          ? 'https://spots-william-nod.vercel.app/'
          : 'http://localhost:3000/'
      }`
    );
    setTimeout(() => spotifyLogoutWindow?.close(), 1000);
}

const logoutComponent = () => {
  return (
    <>
      <Button sx={{
          marginTop: '0.75rem',
          width: '5rem',
          height: '1.5rem'
      }} variant='contained' onClick={logout}>
        Logout
      </Button>
    </>
  );
};

export default logoutComponent;

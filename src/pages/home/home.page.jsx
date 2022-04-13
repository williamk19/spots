import React from 'react';
// import data from '../../data/data';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import './home.page.css';
import SongComponent from '../../components/song/song.component';
import PlaylistComponent from '../../components/playlist/playlist.component';

import { TextField, Button, Box, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const songComponent = ({
  token,
  authUrl,
  onSearchChange,
  callApi,
  data,
  query,
  selected,
  onSelected,
  onDeselect,
  minLength,
  handleDesc,
  handleCreatePlaylist,
}) => {
  const selectedItem = selected.filter((select) => select.name === query);

  return (
    <div className='container'>
      <Router>
        <Switch>
          {/* Create Playlis Route (Protected) */}
          <Route path='/create-playlist'>
            {token ? (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <PlaylistComponent
                        minLength={minLength}
                        handleDesc={handleDesc}
                        handleCreatePlaylist={handleCreatePlaylist}
                      />
                      <TextField
                        sx={{
                          backgroundColor: 'white',
                          borderRadius: '5px',
                        }}
                        color='info'
                        id='filled-basic'
                        type='search'
                        label='Search Song'
                        variant='filled'
                        onChange={onSearchChange}
                      />
                      <Button
                        sx={{
                          marginLeft: '5px',
                          height: '3.45rem',
                        }}
                        color='success'
                        variant='contained'
                        endIcon={<SearchIcon />}
                        onClick={callApi}
                      >
                        Search
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <div className='song-list'>
                        {selectedItem.map((d) => (
                          <SongComponent
                            key={d.id}
                            data={d}
                            selected={selected}
                            onSelected={onSelected}
                            onDeselect={onDeselect}
                          />
                        ))}
                        {data?.tracks?.items?.map((d) => (
                          <SongComponent
                            key={d.id}
                            data={d}
                            selected={selected}
                            onSelected={onSelected}
                            onDeselect={onDeselect}
                          />
                        ))}
                      </div>
                    </Grid>
                  </Grid>
                </Box>

                {/* <input className='input-search' type='search' /> */}
                {/* <button className='btn-search' onClick={callApi}>
                  SEARCH MUSIC
                </button> */}
              </>
            ) : (
              <Redirect to='/' />
            )}
          </Route>

          {/* Login Route (Public) */}
          <Route path='/'>
            {token ? (
              <Redirect to='/create-playlist' />
            ) : (
              <>
                <h1 className='header'>Spots Music Playlist</h1>
                <a className='links' href={authUrl}>
                  Sign In With Spotify
                </a>
              </>
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(songComponent);

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// export default function FullWidthGrid() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2}>
//         <Grid item xs={6} md={8}>
//           <Item>xs=6 md=8</Item>
//         </Grid>
//         <Grid item xs={6} md={4}>
//           <Item>xs=6 md=4</Item>
//         </Grid>
//         <Grid item xs={6} md={4}>
//           <Item>xs=6 md=4</Item>
//         </Grid>
//         <Grid item xs={6} md={8}>
//           <Item>xs=6 md=8</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

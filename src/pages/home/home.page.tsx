import React from 'react';
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

type SelectedType = {
  id: number;
  name: String;
  album: {
    images: {
      url: String;
    }[];
    name: String;
  };
  artists: {
    name: String;
  }[];
};

type DataType = {
  tracks: {
    items: {
      id: number;
      album: {
        images: {
          url: string;
        }[];
        name: string;
      };
      name: string;
      artists: {
        name: string;
      }[];
    }[];
  };
};

type Prop = {
  token: string;
  authUrl: string;
  searchUrl: string;
  selected: SelectedType[];
  data: DataType;
  setData: (data: DataType) => void;
  query: string;
  onSearchChange: () => void;
  onSelected: () => void;
  onDeselect: () => void;
  minLength: () => void;
  handleDesc: () => void;
  handleCreatePlaylist: () => void;
};

const HomePage = ({
  token,
  authUrl,
  onSearchChange,
  data,
  setData,
  query,
  selected,
  onSelected,
  onDeselect,
  minLength,
  handleDesc,
  handleCreatePlaylist,
}: Prop) => {
  const callApi = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    return fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  const selectedItem = selected?.filter((select) => select.name === query);

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
                    <Grid item xs={12} md={8}>
                      <Grid
                        container
                        spacing={2}
                        sx={{ justifyContent: 'center' }}
                      >
                        {selectedItem?.map((d) => (
                          <Grid item key={d.id} xs={12} md={5}>
                            <SongComponent
                              key={d.id}
                              data={d}
                              selected={selected}
                              onSelected={onSelected}
                              onDeselect={onDeselect}
                            />
                          </Grid>
                        ))}
                        {data?.tracks?.items?.map((d) => (
                          <Grid item key={d.id} xs={12} md={5}>
                            <SongComponent
                              key={d.id}
                              data={d}
                              selected={selected}
                              onSelected={onSelected}
                              onDeselect={onDeselect}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
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

const mapStateToProps = (state: any) => ({
  token: state.token,
});
export default connect(mapStateToProps)(HomePage);

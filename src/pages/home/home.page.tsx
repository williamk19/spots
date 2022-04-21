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
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#009688'),
  },
});

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

export const callApi = async (event: any, token: string, query: string) => {
  event.preventDefault();
  return await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));
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
  const selectedItem = selected?.filter((select) => select.name === query);
  console.log(data);

  return (
    <div className='container'>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            {/* Create Playlis Route (Protected) */}
            <Route path='/create-playlist'>
              {token ? (
                <>
                  <Box
                    sx={{
                      height: '100vh',
                      flexGrow: 1,
                      '@media screen and (max-width: 900px)': {
                        height: '100%',
                      },
                    }}
                  >
                    <Grid container>
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
                          data-testid='search-box'
                          onChange={onSearchChange}
                        />
                        <Button
                          sx={{
                            marginLeft: '5px',
                            height: '3.45rem',
                          }}
                          color='primary'
                          variant='contained'
                          data-testid='search-button'
                          endIcon={<SearchIcon />}
                          onClick={async (e) => {
                            setData(await callApi(e, token, query));
                          }}
                        >
                          Search
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Grid
                          container
                          spacing={3}
                          sx={{
                            padding: 8,
                            justifyContent: 'space-evenly',
                            height: '100vh',
                            overflow: 'auto',

                            '@media screen and (max-width: 900px)': {
                              height: '100%',
                              overflow: 'visible',
                            },
                          }}
                        >
                          {selectedItem?.map((d) => (
                            <Grid item key={d.id} xs={12} md={5}
                              sx={{
                                p:0
                              }}
                            >
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
                                data-testid='search-data'
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
                <div className='login-container'>
                  <h1 className='header'>Spots Music Playlist</h1>
                  {/* <a className='links' href={authUrl}>
                  Sign In With Spotify
                </a> */}
                  <Button
                    sx={{
                      padding: '10px 30px',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                    }}
                    color='primary'
                    variant='contained'
                    href={authUrl}
                  >
                    Sign In With Spotify
                    <LibraryMusicIcon
                      sx={{
                        marginLeft: '10px',
                      }}
                    />
                  </Button>
                </div>
              )}
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  token: state.token,
});

export default connect(mapStateToProps)(HomePage);

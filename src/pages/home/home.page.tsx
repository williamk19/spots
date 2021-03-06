import React, { useState } from 'react';
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
import SearchComponent from '../../components/search/search.component';
import ProfileComponent from '../../components/profile/profile.component';
import { Button, Box, Grid } from '@mui/material';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataType, SelectedType } from '../../types/types';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) =>
  augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor('#009688'),
  },
});

type PropType = {
  token: string;
  authUrl: string;
  data: DataType;
  selected: SelectedType[];
  setData: (data: DataType) => void;
  onSelected: () => void;
  onDeselect: () => void;
};

const HomePage = ({
  token,
  authUrl,
  data,
  selected,
  setData,
  onSelected,
  onDeselect,
}: PropType) => {
  const [query, setQuery] = useState('');

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
                        <ProfileComponent />
                        <PlaylistComponent />
                        <SearchComponent
                          query={query}
                          setQuery={setQuery}
                          setData={setData}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Grid
                          container
                          sx={{
                            padding: 8,
                            justifyContent: 'space-evenly',
                            height: '100vh',
                            overflow: 'auto',
                            '@media screen and (max-width: 900px)': {
                              height: '100%',
                              overflow: 'visible',
                            },
                            '@media screen and (max-width: 500px)': {
                              padding: 4,
                            },
                          }}
                        >
                          {data?.tracks?.items?.map((d) => (
                            <Grid item key={d.id} xs={12} md={9} lg={5}>
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
  selected: state.selected
});

export default connect(mapStateToProps)(HomePage);

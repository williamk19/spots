import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TextField, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataType } from '../../types/types';

type PropType = {
  query: string;
  setQuery: (value: string) => void;
  setData: (data: DataType) => void;
  token: string;
};

const search = ({ query, setQuery, setData, token} : PropType) => {
  const onSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setQuery(e.target.value);

  const callApi = async (event: any, token: string, query: string) => {
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

  return (
    <>
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
    </>
  );
};

const mapStateToProps = (state : any) => ({
  token: state.token,
});

export default connect(mapStateToProps)(search);

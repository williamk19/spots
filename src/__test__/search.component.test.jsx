import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchComponent from '../components/search/search.component';
import HomePage from '../pages/home/home.page';

test('Searching button should trigger API call', async () => {
  render(<SearchComponent />);

  const searchbox = screen.findByTestId('search-box');
  const searchBtn = screen.findByTestId('search-button');
  userEvent.type(searchbox, 'eminem');
  userEvent.click(searchBtn);
  await waitFor(() => {
    render(<HomePage />);
    const songsComponent = screen.findByTestId('search-data');
    expect(songsComponent).toBeInTheDocument();
  });
});

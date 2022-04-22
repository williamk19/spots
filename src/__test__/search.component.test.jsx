import React from 'react';
import { waitFor } from '@testing-library/react';
import { server } from '../__mock_data__/server';
import { data } from '../__mock_data__/response';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Searching button should trigger API call', async () => {

  const gifData = await fetch(
    `https://api.spotify.com/v1/search?q=eminem&type=track`
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));

  await waitFor(() => {
    expect(gifData.items).toHaveLength(data.items.length);
  });
});

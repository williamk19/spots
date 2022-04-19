// import { callApi } from '../pages/home/home.page';
import { data } from '../__mock_data__/response';
import { server } from '../__mock_data__/server';
import { waitFor } from '@testing-library/react';
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Tesing spotify search API calls', async () => {
  const gifData = await fetch(
    `https://api.spotify.com/v1/search?q=eminem&type=track`
    // {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.error(err));
  await waitFor(() => {
    expect(gifData.items).toHaveLength(data.items.length);
  });
});

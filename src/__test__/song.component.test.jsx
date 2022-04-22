import React from 'react';
import SongComponent from '../components/song/song.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockData, selectedData } from '../__mock_data__/mockData.js';

let selected = [...selectedData];

const onSelected = (newData) => {
  if (!selected.find((select) => select.id === newData.id)) {
    return selected.push(newData);
  }
};

const onDeselect = (removeData) => {
  selected = selected.filter((select) => select.id !== removeData.id);
};

test('Song component should be render', () => {
  render(
    <SongComponent
      key={1}
      data={mockData}
      selected={selected}
      onSelected={onSelected}
      onDeselect={onDeselect}
    />
  );
  const image = screen.getByTestId('album-images');
  const button = screen.getByTestId('select-button');
  expect(image).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('Selecting a song - push data to selected', () => {
  render(
    <SongComponent
      key={1}
      data={mockData}
      selected={selected}
      onSelected={onSelected}
      onDeselect={onDeselect}
    />
  );
  const button = screen.getByTestId('select-button');
  userEvent.click(button);
  expect(selected).toContain(mockData);
});

test('Deselecting a song - pop data from selected', () => {
  render(
    <SongComponent
      key={1}
      data={mockData}
      selected={selected}
      onSelected={onSelected}
      onDeselect={onDeselect}
    />
  );

  const buttonDeselect = screen.getByTestId('deselect-button');
  userEvent.click(buttonDeselect);

  expect(selected).not.toContain(mockData);
});

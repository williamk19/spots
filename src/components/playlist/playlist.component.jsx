import React from 'react';
import './playlist.component.css';

const playlist = ({minLength, handleDesc, handleCreatePlaylist}) => {
	return (
		<>
			<h1>Create Playlist</h1>
			<form>
				<label htmlFor="title">Song Title</label>
				<input onChange={minLength} type="text" name="temp" id="title"/>
				<label htmlFor="desc">Song Description</label>
				<input onChange={handleDesc} type="text" name="desc" id="desc"/>
				<input type="submit" onClick={handleCreatePlaylist} value="Create Playlist"/>
			</form>
		</>
	);
}

export default playlist;
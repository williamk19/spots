import React, { useState, useEffect } from "react";
import HomePage from "./pages/home/home.page.tsx";
import { connect } from 'react-redux';
import { setToken } from './redux/action';
import PropTypes from "prop-types";
import "./App.css";
const isPublish = true;

const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.REACT_APP_SPOTIFY_API_KEY}&scope=playlist-modify-private&redirect_uri=${isPublish ? "https://spots-william-nod.vercel.app/" : "http://localhost:3000/"}`;
const searchUrl = `https://api.spotify.com/v1/search?type=album&include_external=audio`;

const App = ({token, getToken}) => {
	const [data, setData] = useState({});
	const [selected, setSelected] = useState([]);
	const [currUserId, setCurrUserId] = useState('')
	const [listTitle, setListTitle] = useState('');
	const [listDesc, setListDesc] = useState('');

	useEffect(() => {
		if (!token) {
			let hash = window.location.hash.substring(1);
			let params = {};
			hash.split("&").map((hk) => {
				let temp = hk.split("=");
				return params[temp[0]] = temp[1];
			});
			fetch("https://api.spotify.com/v1/me", {
				headers: {
					Authorization: `Bearer ${params.access_token}`,
					"Content-Type": "application/json"
				}
			}).then(res => res.json()).then(curr => setCurrUserId(curr.id));
			getToken(params.access_token);
		}
	});

	const onSelected = (newData) => {
		if (!selected.find((select) => select.id === newData.id)) {
			return setSelected([...selected, newData]);
		}
	};

	const onDeselect = (removeData) => (
		setSelected(selected.filter((select) => select.id !== removeData.id))
	);

	const minLength = (e) => {
		const { value } = e.target;
		return setListTitle(value);
	};

	const handleDesc = (e) => {
		const { value } = e.target;
		return setListDesc(value);
	};

	const handleCreatePlaylist = async (e) => {
		e.preventDefault();
		if (listTitle.length <= 10) {
			alert("Playlist name must be over 10 characters");
		} else {
			let playlistId = await fetch(
				`https://api.spotify.com/v1/users/${currUserId}/playlists`,
				{
					method: "POST",
					body: JSON.stringify({
						name: `${listTitle}`,
						description: `${listDesc}`,
						public: false,
					}),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			).then(res => res.json()).then(data => data.id);
			const uris = selected.map(select => select.uri).join(',');
			return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`, {
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				method: "POST"
			});
		}
	};

	return (
		<div className="App">
			<HomePage
				authUrl={authUrl}
				searchUrl={searchUrl}
				selected={selected}
				data={data}
				setData={setData}
				onSelected={onSelected}
				onDeselect={onDeselect}
				minLength={minLength}
				handleDesc={handleDesc}
				handleCreatePlaylist={handleCreatePlaylist}
			/>
		</div>
	);
};

App.propTypes = {
	token: PropTypes.string,
	getToken: PropTypes.func
}

const mapStateToProps = (state) => ({
	token: state.token
});


const mapDispatchToProps = (dispatch) => ({
	getToken: (token) => dispatch(setToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

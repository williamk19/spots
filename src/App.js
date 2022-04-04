import React, { useState, useEffect } from "react";
import HomePage from "./pages/home/home.page";
import "./App.css";
const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=55548742d4374324bce1397bcea3dafc&scope=playlist-modify-private&redirect_uri=http://localhost:3000/`;
const searchUrl = `https://api.spotify.com/v1/search?type=album&include_external=audio`;

const App = () => {
	const [token, setToken] = useState("");
	const [query, setQuery] = useState("");
	const [data, setData] = useState({});
	const [selected, setSelected] = useState([]);
	// const [playlist, setPlaylist] = useState({
	// 	temp: "",
	// 	title: "",
	// 	desc: "",
	// });

	const [listTitle, setListTitle] = useState('');
	const [listDesc, setListDesc] = useState('');

	useEffect(() => {
		let hash = window.location.hash.substring(1);
		let params = {};
		hash.split("&").map((hk) => {
			let temp = hk.split("=");
			params[temp[0]] = temp[1];
		});
		setToken(params.access_token);
	});

	const onSelected = (newData) => {
		if (!selected.find((select) => select.id === newData.id)) {
			setSelected([...selected, newData]);
		}
		console.log(selected);
	};

	const onDeselect = (removeData) => {
		setSelected(selected.filter((select) => select.id !== removeData.id));
	};

	const onSearchChange = (e) => {
		setQuery(e.target.value);
	};

	const callApi = (e) => {
		e.preventDefault();
		fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setData(data));
	};

	const minLength = (e) => {
		const { value } = e.target;
		setListTitle(value);
	};

	const handleDesc = (e) => {
		const { value } = e.target;
		setListDesc(value);
	};

	const handleCreatePlaylist = async (e) => {
		e.preventDefault();

		if (listTitle.length <= 10) {
			alert("Playlist name must be over 10 characters");
		} else {
			let playlistId = await fetch(
				`https://api.spotify.com/v1/users/04579w5ezcoyk8zvh4xl1hbwm/playlists`,
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
			fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${uris}`, {
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
				token={token}
				authUrl={authUrl}
				searchUrl={searchUrl}
				selected={selected}
				data={data}
				query={query}
				onSearchChange={onSearchChange}
				onSelected={onSelected}
				onDeselect={onDeselect}
				callApi={callApi}
				minLength={minLength}
				handleDesc={handleDesc}
				handleCreatePlaylist={handleCreatePlaylist}
			/>
		</div>
	);
};

export default App;

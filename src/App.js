import React, { useState, useEffect } from "react";
import HomePage from "./pages/home/home.page.tsx";
import { connect } from 'react-redux';
import { setSelected, setToken, setUser } from './redux/action';
import PropTypes from "prop-types";
import "./App.css";
const isPublish = false;

const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${process.env.REACT_APP_SPOTIFY_API_KEY}&scope=playlist-modify-private&redirect_uri=${isPublish ? "https://spots-william-nod.vercel.app/" : "http://localhost:3000/"}`;

const App = ({token, setToken, user, setUser, selected, setSelected}) => {
	const [data, setData] = useState({});
	
	useEffect(async () => {
		if (!token) {
			let hash = window.location.hash.substring(1);
			let params = {};
			hash.split("&").map((hk) => {
				let temp = hk.split("=");
				return params[temp[0]] = temp[1];
			});
			if (params.access_token) {
				await fetch("https://api.spotify.com/v1/me", {
					headers: {
						Authorization: `Bearer ${params.access_token}`,
						"Content-Type": "application/json"
					}
				}).then(res => res.json()).then(curr => setUser(curr));
				setToken(params.access_token);
			}
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

	

	return (
		<div className="App">
			<HomePage
				authUrl={authUrl}
				data={data}
				currUser={user}
				setData={setData}
				onSelected={onSelected}
				onDeselect={onDeselect}
			/>
		</div>
	);
};

App.propTypes = {
	token: PropTypes.string,
	setToken: PropTypes.func,
	user: PropTypes.object,
	setUser: PropTypes.func,
	selected: PropTypes.array,
	setSelected: PropTypes.func
}

const mapStateToProps = (state) => ({
	token: state.token,
	user: state.user,
	selected: state.selected
});


const mapDispatchToProps = (dispatch) => ({
	setToken: (token) => dispatch(setToken(token)),
	setUser: (user) => dispatch(setUser(user)),
	setSelected: (selected) => dispatch(setSelected(selected))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

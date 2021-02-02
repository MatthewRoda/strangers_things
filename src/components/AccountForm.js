import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const AccountForm = ({type, setToken, setUser}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const title = type === 'login' ? 'Login' : 'Register';
	const oppositeTitle = type === 'login' ? 'Register' : 'Login';
	const oppositeType = type === 'login' ? 'register' : 'login';
	const history = useHistory();
	
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		
		const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/${type}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				user:{
					username,
					password
				}
			})
		});
		const {data} = await response.json();
		const token = data?.token;
		if (token) {
			setToken(token);
			const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me`, {
			  method: 'GET',
			  headers: {
			    'Authorization': `Bearer ${token}`,
			  },
			});
			const {data} = await response.json();
			setUser(data);
			setUsername('');
			setPassword('');
			history.push('/')
		}

	}
	
	return <>
		<h2>{title}</h2>
		<form onSubmit={handleSubmit}>
			<input type='text' value={username} onChange={(ev) => setUsername(ev.target.value)} placeholder="username"></input>
			<input type='password' value={password} onChange={(ev) => setPassword(ev.target.value)} placeholder="password"></input>
			<button type="submit">{title}</button>
		</form>
		<Link to={`/${oppositeType}`}>{oppositeTitle}</Link>
	</>
}

export default AccountForm;

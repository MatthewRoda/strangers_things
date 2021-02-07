import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {
	AccountForm,
	Profile,
	Posts,
	PostsAdd,
} from './components';

const App = () => {
	const [token, setToken] = useState('');
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [editingPost, setEditingPost] = useState({});
	
	const fetchObj = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': token ? `Bearer ${token}` : null
		}
	};
	const fetchAndSet = async () => {
		try{
			const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts', fetchObj);
			const {data} = await response.json();
			setPosts(data.posts);
		}
		catch (error){
			console.error(error);
		}
	};

	return <>
		<header>
			<Link to='/'>Home</Link>
			<Link to='/login'>Log In/Create Account</Link>
			<Link to='/profile'>my account</Link>
			<Link to='/createpost'>create a posting</Link>
		</header>
		<div className='bulk'>
			
			<Route exact path='/'>
			<h1>Strangers Things</h1>
			{user.username && <div>Hello {user.username}</div> }
				<h2>Search:</h2>
				<input type='text' value={searchTerm} onChange={(ev) => setSearchTerm(ev.target.value)} placeholder="search strangers things"></input>
				<Posts fetchAndSet={fetchAndSet} setEditingPost={setEditingPost}searchTerm={searchTerm} setSearchTerm={setSearchTerm} token={token} posts={posts} setPosts={setPosts}/>
			</Route>
			
			<Route path='/createpost'>
				<PostsAdd fetchAndSet={fetchAndSet} setEditingPost={setEditingPost} editingPost={editingPost}token={token} posts={posts} setPosts={setPosts}/>
			</Route>
			
			<Route path='/login'>
				<AccountForm type={'login'} setToken={setToken} setUser={setUser}/>
			</Route>
			
			<Route path='/register'>
				<AccountForm type={'register'} setToken={setToken} setUser={setUser}/>
			</Route>
			<Route path='/profile'>
				<Profile user={user}/>
			</Route>
		</div>
	</>
}

ReactDOM.render(
	<Router>
  	<App />
  </Router>,
  document.getElementById('app'),
);

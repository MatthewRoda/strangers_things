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

	//this keeps breaking the user state by setting user to null, 
	/*useEffect( async ()=> {
		const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/users/me', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});
		const data = await response.json();
		if (data.success === true){
			setUser(data.data.user)
		}
	}, [token] );*/
	
	return <>
		<h1>Strangers Things</h1>
		{user.username && <div>Hello {user.username}</div> }
		<Link to='/profile'>my account</Link>
		<Link to='/login'>Log In</Link>
		<Link to='/register'>Register Account</Link>
		<Link to='/'>Home</Link>
		<Link to='/createpost'>create a posting</Link>
		
		<Route path='/login'>
			<AccountForm type={'login'} setToken={setToken} setUser={setUser}/>
		</Route>
		<Route path='/register'>
			<AccountForm type={'register'} setToken={setToken} setUser={setUser}/>
		</Route>
		<Route path='/profile'>
			<Profile user={user}/>
		</Route>
		<Route exact path='/'>
			<Posts token={token} posts={posts} setPosts={setPosts}/>
		</Route>
		<Route path='/createpost'>
			<PostsAdd token={token} posts={posts} setPosts={setPosts}/>
		</Route>
		{console.log(token)}
	</>
}

ReactDOM.render(
	<Router>
  	<App />
  </Router>,
  document.getElementById('app'),
);

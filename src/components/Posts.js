import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {SendMessage} from './';

const Posts = ({posts, setPosts, token}) => {
	
  const fetchObj = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token ? `Bearer ${token}` : null
			}
	};

  const deleteObj = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
	};
			
	const fetchAndSet = async () => {
		const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts', fetchObj);
		const {data} = await response.json();
		setPosts(data.posts);
	};
	
	const fetchAndDelete = async (anId) => {
		const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${anId}`, deleteObj);
		const {data} = await response.json();
	};
	
	const handleDelete = (id) => {
		console.log('id: ', id);
		fetchAndDelete(id);
		fetchAndSet();
	}; 
	 
  useEffect(async () => {
		fetchAndSet();
  }, []);
  
  return posts.map(post => {
  		return <React.Fragment key= {post._id}>
  			<h3>{post.title}</h3>
  			<div>{post.description}</div>
  			<div>Price: {post.price}</div>
  			<div>Location: {post.location}</div>
  			<div>{post.willDeliver ? 'Is' : 'Is not'} willing to deliver</div>
  			{token && !post.isAuthor ? <SendMessage token={token} id={post._id}/> : ''}
  			{post.isAuthor ?  <button onClick={(ev)=>{ev.preventDefault();handleDelete(post._id);}}type='button'>author bb</button>: ''}
  		</React.Fragment>
  	})
}

export default Posts;

import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {SendMessage} from './';

const Posts = ({fetchAndSet, setEditingPost, posts, setPosts, token, searchTerm, setSearchTerm}) => {
	
	const history = useHistory();


  const deleteObj = {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
	};
	
	const fetchAndDelete = async (anId) => {
		const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${anId}`, deleteObj);
		const {data} = await response.json();
	};
	
	const handleDelete = (id) => {
		fetchAndDelete(id);
		fetchAndSet();
	}; 
	
	const handleEdit = (post) => {
		setEditingPost(post);
		history.push('/createpost')
	};
	 
  useEffect(async () => {
		fetchAndSet();
  }, []);
  
  
  const postMatches = (post, text) => {
  	const smallText = text.toLowerCase();
  	const lilLoco = post.location.toLowerCase();
  	const lilTitle = post.title.toLowerCase();
  	const lilDesc = post.description.toLowerCase();
  	
  	if (lilLoco.includes(smallText) || lilTitle.includes(smallText) || lilDesc.includes(smallText)) {
  		return true
  	}
  	else {
  		return false
  	}
  }
  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;
  
  return <div className='posts'>
  	{postsToDisplay.map(post => {
  		return <div className='post' key={post._id}>
  			<h2>{post.title}</h2>
					<div>{post.description}</div>
					<div>Price: {post.price}</div>
					<div>Location: {post.location}</div>
					<div>{post.willDeliver ? 'Is' : 'Is not'} willing to deliver</div>
					{token && !post.isAuthor ? <SendMessage token={token} id={post._id}/> : ''}
					{post.isAuthor ?  
					<>
						<button onClick={(ev)=>{ev.preventDefault();handleEdit(post);}}type='button'>Edit your posting</button>
						<br />
						<button onClick={(ev)=>{ev.preventDefault();handleDelete(post._id);}}type='button'>Delete your posting</button>
					</>
					: ''}
  		</div>
  	})}
  </div>
}

export default Posts;

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

const Posts = ({posts, setPosts}) => {

  
  useEffect(async () => {
		const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts');
		const {data} = await response.json();
		console.log(data);
		setPosts(data.posts);
  }, []);
  
  return posts.map(post => {
  		return <React.Fragment key= {post._id}>
  			<h3>{post.title}</h3>
  			<div>{post.description}</div>
  			<div>Price: {post.price}</div>
  			<div>Location: {post.location}</div>
  			<div>{post.willDeliver ? 'Is' : 'Is not'} willing to deliver</div>
  		</React.Fragment>
  	})
}

export default Posts;

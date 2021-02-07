import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Profile = ({user}) => {
	
	const {messages, username} = user;
	
	return user.username ? <div className='profile'>
		<h1>{user.username}'s profile</h1>
		<div className='messages'>
			<h2>Messages:</h2>
			{messages.map(message => {
				return <div className='message' key ={message._id}>
					<h4>Message from {message.fromUser.username !== username ? message.fromUser.username : `you to`} about {message.post.title}</h4>
					<div>{message.content}</div>
				</div>
			})}
		</div>	
	</div> : <h3>Please log in or create a new account</h3>;

}

export default Profile;

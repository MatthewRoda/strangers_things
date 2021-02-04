import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Profile = ({user}) => {
	
	const {messages, username} = user;
	
	
	return <>
		<h2>{user.username}'s profile</h2>
		<h2>Messages:</h2>
		{console.log(user)}
			{messages.map(message => {
				return <React.Fragment key ={message._id}>
					<h4>Message from {message.fromUser.username !== username ? message.fromUser.username : `you to`} about {message.post.title}</h4>
					<div>{message.content}</div>
				</React.Fragment>
			})}
	</>

}

export default Profile;

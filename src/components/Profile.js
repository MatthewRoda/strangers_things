import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Profile = ({user}) => {

	return <>
		<h2>{user.username}'s profile</h2>
		<h2>Messages:</h2>
			{user.messages.map(message => {
				return <React.Fragment key ={message._id}>
					<h4>Message from {message.fromUser.username} about {message.post.title}</h4>
					<div>{message.content}</div>
				</React.Fragment>
			})}
	</>

}

export default Profile;

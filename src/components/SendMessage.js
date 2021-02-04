import React, {useState} from 'react';

const SendMessage = ({id, token}) => {
	
	const [message, setMessage] = useState('');
	
	const fetchObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
				},
			body: JSON.stringify({
				message: {
				  content: message
					}
			})
	};
	
	const messageFetch = async () => {
		const response = await fetch(`https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts/${id}/messages`, fetchObj);
		const data = await response.json();
		console.log('message fetch: ', data);
	};
	
	const handleSubmit = (ev) => {
		ev.preventDefault();
		messageFetch();
	  setMessage('');
	};
	
	return <form onSubmit={handleSubmit}>
		<textarea value={message} onChange={(ev) => setMessage(ev.target.value)} placeholder="send a message about this posting"></textarea>
		<button type="submit">Send message</button>
	</form>
};

export default SendMessage;

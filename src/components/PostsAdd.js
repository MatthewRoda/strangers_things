import React, {useState} from 'react';

const PostsAdd = ({token, setPosts, posts}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [willDeliver, setWillDeliver] = useState(false);
	const [location, setLocation] = useState('');
	
	const handleSubmit = async (ev) => {
		ev.preventDefault();
		const response = await fetch('https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT/posts', {
			method: "POST",
			headers: {
			'Content-Type': 'application/json',
    	'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
		  	post: {
				  title: title,
				  description: description,
				  price: price,
				  willDeliver: willDeliver,
				  location: location,
    			}
				})
			});
		const {data} = await response.json();
		console.log(data);
		setTitle('');
		setDescription('');
		setPrice('');
		setWillDeliver('');
		setLocation('');
		setPosts([...posts, data.post]);
	}

	return <>
		<form onSubmit={handleSubmit}>
			<textarea value={title} onChange={(ev) => setTitle(ev.target.value)} placeholder="title"></textarea>
			<textarea value={description} onChange={(ev) => setDescription(ev.target.value)} placeholder="description"></textarea>
			<textarea type='text' value={price} onChange={(ev) => setPrice(ev.target.value)} placeholder="price"></textarea>
			<textarea type='text' value={location} onChange={(ev) => setLocation(ev.target.value)} placeholder="location"></textarea>
			<label htmlFor='willDeliver'>Yes</label>
			<input type='radio' id='willDeliverTrue' name='willDeliver' value={true}></input>
			<label htmlFor='willNotDeliver'>No</label>
			<input type='radio' id='willDeliverFalse' name='willDeliver' value={false}></input>
			<button type="submit">Submit Post</button>
		</form>
	</>
}

export default PostsAdd;

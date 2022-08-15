import { useState, useEffect } from 'react';
import { Grid, Card, Typography, CardContent, TextField, Button, CircularProgress } from '@mui/material'
import { useNavigate, useParams} from 'react-router-dom';

export const TaskForm = () => {
	const [task, setTask] = useState({title: '', description: ''});
	const [loading, setLoading] = useState(false);
	const [editing, setEditing] = useState(false);
	const params = useParams();
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			if(editing) {
				await fetch(`http://localhost:4000/tasks/${params.id}`, {
					method:'PUT', body: JSON.stringify(task), headers: {'Content-Type': 'application/json'}
				});
			}
			await fetch('http://localhost:4000/tasks', {
				method: 'POST', body: JSON.stringify(task), headers: {'Content-Type': 'application/json'}
			});
			setLoading(false);
			setEditing(false);
			navigate('/');
		} catch (error) { console.log(error) }
	}
	
	const handleChange = (e) => setTask({...task, [e.target.name]: e.target.value})

	const loadTask = async id => {
		try {
			const res = await fetch(`http://localhost:4000/tasks/${id}`);
			const data = await res.json();
			setTask({title: data.title, description: data.description});
			setEditing(true);
		} catch (error) { console.log(error) }
	}
	
	useEffect(() => {
		if(params.id) loadTask(params.id);
	}, [params.id])
	

  	return (
    	<Grid container direction='column' alignContent='center' justifyContent='center'>
			<Grid item xs={3}>
				<Card sx={{mt: 5}} style={{backgroundColor: '#1e272e', padding: '1rem'}}>
					<Typography variant='5' textAlign='center' color='#fff'>
						{editing ? 'Edit Task' : 'Create Task'}
					</Typography>
					<CardContent>
						<form onSubmit={handleSubmit}>
							<TextField 
								variant='filled' 
								label='Write your title' 
								sx={{display: 'block', margin: '0.5rem 0'}}
								name='title'
								inputProps={{style: {color: '#fff'}}}
								InputLabelProps={{style: {color: '#fff'}}}
								onChange={handleChange}
								value={task.title}
							/>
							<TextField 
								variant='filled' 
								label='Write your description' multiline rows={4}
								sx={{display: 'block', margin: '0.5rem 0'}}
								name='description'
								inputProps={{style: {color: '#fff'}}}
								InputLabelProps={{style: {color: '#fff'}}}
								onChange={handleChange}
								value={task.description}
							/>
							<Button 
								variant='contained' 
								color='primary' 
								type='submit' 
								disabled={!task.title || !task.description}
							>
								{loading ? <CircularProgress color='inherit' size={24} /> : 'Save'}
							</Button>
						</form>
					</CardContent>
				</Card>
			</Grid>	
		</Grid>
  	)
}

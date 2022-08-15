import { useState, useEffect } from "react";
import {Button, Card, CardContent, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
	const navigate = useNavigate();
	const loadTasks = async () => {
		try {
			const res = await fetch("http://localhost:4000/tasks");
			const data = await res.json();
			setTasks(data);
		} catch (error) { console.log(error) }
    };

	const handleDelete = async id => {
		try {
			await fetch(`http://localhost:4000/tasks/${id}`, {method: 'DELETE'});
			setTasks(tasks.filter(task => task.id !== id));
		} catch (error) { console.log(error) }
	}

  	useEffect(() => {
		loadTasks();
	}, []);
	
  	return (
    	<>
      		<h1>Task List</h1>
			{tasks.length === 0 ? (
				<Typography variant="h2" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', inset: '50% 0'}}>
					No task created!!!
				</Typography>
			) : ( 
			tasks.map(task => (
				<Card key={task.id} style={{marginBottom: '0.7rem', backgroundColor: '#1e272e'}}>
					<CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
						<div style={{color: '#fff'}}>
							<Typography>{task.title}</Typography>
							<Typography>{task.description}</Typography>
						</div>

						<div>
							<Button 
								variant='contained' 
								color='inherit' 
								onClick={() => navigate(`/task/${task.id}/edit`)}
							>
								Edit
							</Button>
							<Button 
								variant='contained' 
								color='warning' 
								style={{marginLeft: '0.5rem'}} 
								onClick={() => handleDelete(task.id)}
							>
								Delete
							</Button>
						</div>
					</CardContent>
				</Card>
			)))}
		</>
  	);
};

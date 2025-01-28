import React, { useState } from 'react';
import axios from 'axios';

const WorkoutForm = ({ userId }) => {  // Accept userId as a prop from the parent component
    const [exercise, setExercise] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs to ensure they are not empty
        if (!exercise || !duration || !calories) {
            setMessage('Please fill in all fields.');
            return;
        }

        // Send the workout data to the backend API
        try {
            const workoutData = {
                exercise,
                duration: parseInt(duration),
                calories: parseInt(calories),
                userId: userId  // Include userId in the request
            };

            const response = await axios.post(
                'https://9emyh9ynxh.execute-api.eu-west-1.amazonaws.com/dev/workout',  // Use actual API URL
                workoutData
            );

            // If the request is successful, reset the form and show a success message
            setExercise('');
            setDuration('');
            setCalories('');
            setMessage('Workout logged successfully!');
        } catch (error) {
            setMessage('Error logging workout.');
            console.error('Error logging workout:', error);
        }
    };

    return (
        <div>
            <h2>Log Your Workout</h2>
            <form onSubmit={handleSubmit}>
                <label>Exercise:</label>
                <input
                    type="text"
                    value={exercise}
                    onChange={(e) => setExercise(e.target.value)}
                    required
                />
                <label>Duration (in minutes):</label>
                <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
                <label>Calories Burned:</label>
                <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    required
                />
                <button type="submit">Log Workout</button>
            </form>
            {message && <p>{message}</p>}  {/* Display success or error message */}
        </div>
    );
};

export default WorkoutForm;

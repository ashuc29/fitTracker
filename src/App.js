import React, { useState } from "react";
import axios from "axios";
import './App.css'; // Import the CSS file

// Use your actual API URL here
const API_URL = "https://9emyh9ynxh.execute-api.eu-west-1.amazonaws.com/dev"; // Update to the actual API URL

const App = () => {
  const [exercise, setExercise] = useState(""); // To hold exercise input
  const [duration, setDuration] = useState(""); // To hold duration input
  const [calories, setCalories] = useState(""); // To hold calories input
  const [message, setMessage] = useState(""); // To display feedback messages
  const [progress, setProgress] = useState(null); // To store fitness progress
  const [showProgress, setShowProgress] = useState(false); // Toggle to show/hide progress
  const [isLoading, setIsLoading] = useState(false); // To manage loading state
  const userId = "ashuc29"; // Replace with actual userId

  // Fetch progress from the backend
  const fetchProgress = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`${API_URL}/progress?userId=${userId}`); // Pass the actual userId
      console.log("API Response:", response.data); // Check the response in console
      setProgress(response.data); // Store the data in the state
      setShowProgress(true); // Show progress after fetching it
    } catch (error) {
      setMessage("Error fetching progress.");
      console.error("Error fetching progress:", error);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  // Add new workout
  const addWorkout = async () => {
    if (!exercise.trim() || !duration.trim() || !calories.trim()) return;

    try {
      const workoutData = {
        exercise,
        duration: parseInt(duration),
        calories: parseInt(calories),
        userId: userId // Use actual userId, or dynamically handle based on the logged-in user
      };

      // POST request to the workout endpoint
      await axios.post(`${API_URL}/workout`, workoutData); // This is where the workout is logged
      setExercise("");
      setDuration("");
      setCalories("");
      setMessage("Workout logged successfully!");
    } catch (error) {
      setMessage("Error logging workout.");
      console.error("Error adding workout:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Fitness Tracker </h1>

      {/* Workout Form */}
      <div className="form">
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          placeholder="Exercise (e.g., Running)"
          className="input"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Duration (in minutes)"
          className="input"
        />
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="Calories Burned"
          className="input"
        />
        <div>
          <button
            onClick={addWorkout}
            className="button"
            disabled={!exercise.trim() || !duration.trim() || !calories.trim() || isLoading}
          >
            {isLoading ? 'Logging Workout...' : 'Log Workout'}
          </button>
        </div>
      </div>

      {/* Feedback Message */}
      {message && <p className="message">{message}</p>}

      {/* Show Progress Button */}
      <button onClick={fetchProgress} className="button" disabled={isLoading}>
        {isLoading ? 'Loading Progress...' : 'Show Progress'}
      </button>

      {/* Display Progress */}
      {showProgress && progress && (
        <div className="progress">
          <h2>Progress</h2>
          <p>Total Calories Burned: {progress.totalCalories || 0}</p>
          <p>Workouts Logged: {progress.workouts || 0}</p>
        </div>
      )}
    </div>
  );
};

export default App;

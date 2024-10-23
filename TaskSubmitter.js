import React, { useState } from 'react';
import axios from 'axios';       // importing axios library to make request to node API

const TaskSubmitter = () => {
  const [userId, setUserId] = useState('');      // state to manage user id
  const [message, setMessage] = useState('');     // state to manage server response

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage('User ID is required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/task', { user_id: userId }); // sending data to backend API 
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Error occurred');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Task Submitter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Submit Task</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default TaskSubmitter;

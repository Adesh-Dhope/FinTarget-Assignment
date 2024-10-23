const fs = require('fs');
const path = require('path');
const Task = require('../Models/Task');

const taskQueue = {};

async function task(user_id) {
    const logMessage = `${user_id} - task completed at ${Date.now()}\n`;          // recording when task has completed
    const logFilePath = path.join(__dirname, '../Logs/task_log.txt');          // sending task details to task_log.txt file

    // Append to log file
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log(logMessage.trim());
        }
    });

    // Save task to MongoDB
    const newTask = new Task({ user_id });
    await newTask.save();
    console.log(`Task saved in MongoDB for user: ${user_id}`);
}

module.exports = { taskQueue, task };

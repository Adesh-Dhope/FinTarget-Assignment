const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes.js');
const db = require('./Config/db.js');
const clusterSetup = require('./Cluster.js');
const cors = require('cors');
require('dotenv').config();


if (require('cluster').isMaster) {
    clusterSetup();
} else {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());    // to all request from diifferent origin


    // Routes
    app.use('/api/v1/task', taskRoutes);
    app.listen(PORT, () => {               // PORT had defined in .env file
        console.log(`Server running on port ${PORT}, Worker PID: ${process.pid}`);
    });
}

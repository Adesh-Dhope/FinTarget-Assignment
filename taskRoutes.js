const express = require('express');
const rateLimit = require('express-rate-limit');
const { taskQueue, task } = require('../Controllers/taskController');
const router = express.Router();

const perSecondLimiter = rateLimit({        // applying rate limit 1 request per second
    windowMs: 1000,
    max: 1,
    keyGenerator: (req) => req.body.user_id,
    handler: (req, res) => res.status(400).send({ error: '1 task per second limit exceeded' })
});

const perMinuteLimiter = rateLimit({          // applying rate limit 20 request per mimute
    windowMs: 60 * 1000,
    max: 20,
    keyGenerator: (req) => req.body.user_id,
    handler: (req, res) => res.status(400).send({ error: '20 tasks per minute limit exceeded' })
});

router.post('/api/v1/task', perSecondLimiter, perMinuteLimiter, (req, res) => {      // we defined specific route
    const { user_id } = req.body;
    if (!user_id) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    if (!taskQueue[user_id]) {                                   // we created queueing system to process additional
        taskQueue[user_id] = { tasks: [], intervalRef: null };    // request that come after rate limit exceedded
    }

    taskQueue[user_id].tasks.push(() => task(user_id));

    if (!taskQueue[user_id].intervalRef) {
        taskQueue[user_id].intervalRef = setInterval(() => {
            if (taskQueue[user_id].tasks.length > 0) {
                const nextTask = taskQueue[user_id].tasks.shift();
                nextTask();
            } else {
                clearInterval(taskQueue[user_id].intervalRef);
                taskQueue[user_id].intervalRef = null;
            }
        }, 1000);
    }

    res.status(202).send({ message: 'Task queued successfully' });
});

module.exports = router;

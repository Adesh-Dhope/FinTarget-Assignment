const cluster = require('cluster');
const os = require('os');

module.exports = function clusterSetup() {
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Starting a new worker...`);
        cluster.fork();
    });
};

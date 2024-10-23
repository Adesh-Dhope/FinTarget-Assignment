const mongoose = require('mongoose'); 
require('dotenv').config();             // importing mongodb connectoion url from .env file 

mongoose.connect(process.env.MONGO_URI, {   // connecting mongodb compass 
    useNewUrlParser: true,
    useUnifiedTopology: true                 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

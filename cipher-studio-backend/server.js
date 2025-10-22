const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB Atlas.'))
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));

app.listen(PORT, () => {
  console.log(`Backend server is listening on http://localhost:${PORT}`);
});
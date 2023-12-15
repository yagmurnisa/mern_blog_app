const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.CONNECT_URL);
      console.log('MongoDB Connected!');
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
};

const corsOptions = {
    origin: '*',
    credentials: true, 
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ extended: false }));
connectDB();
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));


const PORT =  process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
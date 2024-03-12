const mongoose = require('mongoose');

const connectDb = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Could not connect to database:', err));
};

module.exports = connectDb;

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.listen(8080, () => {
    console.log('listening on port 8080')
})

mongoose.connect('mongodb://localhost:27017/mock', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.on('connected', () => console.log('connected to db: "Mock"'))
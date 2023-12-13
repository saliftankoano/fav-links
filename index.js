const express = require('express');
const app = express();

const PORT = 5555;

const db = require('./queries');

const path = require('path');

app.use(express.static(path.resolve(__dirname, '../client/dist', 'index.html')));
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
})

// Starting express on the PORT
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}.`);
});

//CRUD 

//CREATE
//READ
app.get('/links', db.getLinks)
//UPDATE
//DELETE

// Connect to postgress using the node-postgress package

const POOL = require('pg').Pool;

const pool = new POOL({
    user: 'salif',
    host: 'localhost',
    database: 'favlinks',
    password: 'Engineerbbf23',
    port: 5432
})
console.log(pool);

//Create functions that will handle requests

//Get all the data
const getLinks = (req,res)=>{
    pool.query('SELECT * FROM links ORDER BY id ASC', (error, result)=>{
        if(error){
            throw error;
        }
        res.status(200).json(result.rows)
    });
}

//Export functions

module.exports ={
    getLinks
}
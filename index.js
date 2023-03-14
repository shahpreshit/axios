const express = require('express');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const axios = require('axios');


const PORT = 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'sunilshah',
        database: 'vernost'
    }
});

app.get('/users', async (req, res) => {
    console.log(req.body);
    const data = await knex.select('*').from('users');
    return res.status(200).json({
        data: data
    })
});


app.get('/get-data', async (req, res) => {
    let response = await axios.get('http://localhost:3001/users')
    return res.status(200).json({
        Result: response.data
    })
})

app.post("/post", async (req, res) => {
    await knex("users").insert(req.body);
    return res.json({
        data: req.body
    });
});

app.post("/add-user", (req, res) => {
    const data = {
        name: req.body.name,
    }
    axios.post("http://localhost:3001/post", data).then((result) => {
        return res.status(200).json({
            data: result.data,
        });
    });
});






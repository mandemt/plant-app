const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config() 
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PORT = process.env.DB_PORT


const app = express()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const db = mysql.createConnection({host: "localhost",
user: DB_USER,
password: DB_PASSWORD,
database: DB_NAME,
}

)

app.get('/', (re, res) => {
    return res.json("backend boodschap")

})
app.get('/planten', (req, res) => {
    const sql = "SELECT * FROM plants";
    db.query(sql, (err, data) => {
        console.log(data)

        return res.json(data)
    })
})

app.get('/anders', (req, res) => {
    const sql = "SELECT plant_hoofdgroep FROM plants";
    db.query(sql, (err, data) => {
        console.log(data)

        return res.json(data)
    })
})

app.post('/anders', (req, res) => {

    const sql = "INSERT INTO plants (id, plant_name, plant_family, plant_hoofdgroep, plant_bloemkleur, invasief) VALUES (97, ?, 'kip', 'kip', 'kip', 0)"

    db.query(sql, req.body[0].name, (err, data) => {
        console.log(data)
        if(err){
            console.log(err)
        }
        return res.json(data)
    })
    console.log(req.body[0].name)

})
app.listen(3307, () => {
    console.log('server luistert' )
})






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

app.get('', (req, res) => {
    console.log('yoo')

    return res.json("backend boodschap")

})
app.post('/planten/:id', (req, res) => {
    let id = req.body[0].id
    console.log(id)
    const sql = "SELECT * FROM plants WHERE id=?";
    db.query(sql, id,(err, data) => {
console.log(data)
        return res.json(data)
    })
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
let insertData = req.body[0]
    const sql = "INSERT INTO plants (id, plant_name, plant_family, plant_hoofdgroep, plant_bloemkleur, invasief) VALUES (NULL, ?,?,?,?,?)"

    db.query(sql, [insertData.name,insertData.family,insertData.group,insertData.color,insertData.invasive], (err, data) => {
        console.log(data)
        if(err){
            console.log(err)
        }
        return res.json(data)
    })

})
app.listen(3307, () => {
    console.log('server luistert' )
})






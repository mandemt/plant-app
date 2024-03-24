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
app.use(express.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: "localhost",
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
}

)

app.get('/', (req, res) => {
    console.log('yoo')

    return res.json("backend boodschap")

})
app.post('/planten/:id', (req, res) => {
    let id = Number(req.body[0].id)
    console.log(id)


    const registerWatch = [{ getData: "SELECT * FROM plants  AS planten JOIN plant_watcher AS p ON p.plant_id = planten.plant_id WHERE planten.plant_id=?" }, { postData: "UPDATE plant_watcher SET plant_watched=? WHERE plant_id = ?" }]
    db.query(registerWatch[0].getData, id, (err, data) => {
        let result = data
        postData(Number(result[0].plant_watched))

        return res.json(data)
        function postData(result) {
            db.query(registerWatch[1].postData, [(result + 1), id], (err, data) => {
            })
        }
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
    const sql = ["INSERT INTO plants (plant_id, plant_name, plant_family, plant_hoofdgroep, plant_color, invasive) VALUES (NULL, ?,?,?,?,?)",
        "INSERT INTO plant_watcher (plant_id, plant_watched) VALUES((SELECT MAX(plant_id) FROM plants), 0)"]
    let insertplant = db.query(sql[0], [insertData.name, insertData.family, insertData.group, insertData.color, insertData.invasive], (err, data) => {
        if (err) {
            console.log(err)
        }
    })
    let watcher = db.query(sql[1], 0, (err, data) => {
        if (err) {
            console.log(err)
        }
        return res.json(data)
    })

})

app.get('/kenmerken', (req, res) => {
    const sql = "SELECT * FROM properties";
    db.query(sql, (err, data) => {
        return res.json(data)
    })
})

app.post('/kenmerken/:id', (req, res) => {
  let id = req.body.id

    const registerWatch = [{ getData: "SELECT * FROM properties  AS kenmerken JOIN property_watcher AS pw ON pw.property_id = kenmerken.property_id WHERE kenmerken.property_id=?" }, { postData: "UPDATE property_watcher SET property_watched=? WHERE property_id = ?" }]
    db.query(registerWatch[0].getData, id, (err, data) => {
        let result = data

            console.log('0')
        //    postData(0)
        // console.log(result)
        postData(Number(result[0].property_watched))

        function postData(result) {
            db.query(registerWatch[1].postData, [(result + 1), id], (err, data) => {
            })
        }

    })

    const sql = ["SELECT * FROM properties where property_id=?", "SELECT DISTINCT ?? FROM plants "]
    let search = db.query(sql[0], req.body.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        let searchFor = data[0].property_name // naam van de property in database




        let go = db.query(sql[1], searchFor, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log(data)
            return res.json(data)
        })
    })
})

app.post('/kenmerken/:id/:id', (req, res) => {
    let body = req.body
    let alles = { property_info: '', plant_info: [] }
    const sql = ["SELECT * FROM properties WHERE property_id =? ", "SELECT * FROM plants WHERE ??=?"];
    let searchPropName = db.query(sql[0], body.propId, (err, data) => {
        alles.property_info = data[0]
        console.log(body)
        db.query(sql[1], [alles.property_info.property_name, body.propName], (err, data) => {
            alles.plant_info = data
            res.json(alles)

        })

    })
})




app.listen(3307, () => {
    console.log('server luistert')
})






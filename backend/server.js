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

app.get('', (req, res) => {
    console.log('yoo')

    return res.json("backend boodschap")

})
app.post('/planten/:id', (req, res) => {
    let id = Number(req.body[0].id)
    console.log(id)
    // const query = "SELECT * FROM plants  AS planten JOIN profile AS p ON p.plant_id = planten.plant_id WHERE planten.plant_id=?"
    // db.query(query, id, (err, data) => {
    //     result.push(data[0].watched)
    // return res.json(data)
    // })


    const registerWatch = [{ getData: "SELECT * FROM plants  AS planten JOIN plant_watcher AS p ON p.plant_id = planten.plant_id WHERE planten.plant_id=?" }, { postData: "UPDATE plant_watcher SET plant_watched=? WHERE plant_id = ?" }]
    console.log(registerWatch[0].getData)
    db.query(registerWatch[0].getData, id, (err, data) => {
        let result = data
        console.log(result)
        postData(Number(result[0].plant_watched))

        return res.json(data)
        function postData(result) {
            db.query(registerWatch[1].postData, [(result + 1), id], (err, data) => {
            })
        }
    })




    // db.query(registerWatch, result, id, (err, data) => {
    // })
    // let q_res = queries.map((q) => {
    //     return db.query(q, id, (err, data) => {
    //         console.log(data)
    //         return data;
    //     });
    // });


    //   console.log(JSON.stringify(result))
    // return {
    //     profiles: q_res[0],
    //     planten: q_res[1]
    // }

    // console.log(res.json(q_res));

    //return res.json(q_res);


    //  const sql2 = "SELECT * FROM plants WHERE id=?"
    // db.query(sql, id, (err, data) => {

    // useData(data)
    // })
    // function useData(jo){
    //  return res.json(jo)
    // }
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
        console.log(data)

        return res.json(data)
    })
})

app.post('/kenmerken/:id', (req, res) => {
    
    console.log(req.body.id)
    const sql = ["SELECT * FROM properties where property_id=?", "SELECT DISTINCT ?? FROM plants "]
   let search =  db.query(sql[0], req.body.id, (err, data) => {
        if (err) {
            console.log(err)
        }
        let searchFor = data[0].property_name
        console.log(searchFor)

        let go = db.query(sql[1], searchFor, (err, data) => {
            if (err) {
                console.log(err)
            }
        return res.json(data)
})})})
app.listen(3307, () => {
    console.log('server luistert')
})






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

app.post('/planten/:id/register', (req, res) => {
    let plantid = req.body[0]
    db.query("SELECT property_id FROM properties WHERE property_name=?", req.body[1], (err, data) => {
        console.log(data)
        let id = data[0].property_id
        db.query("UPDATE plant_prop_watcher SET plop_watch = plop_watch + 1  WHERE plant_id=? AND property_id=?", [plantid, id], (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log('jojo')
        })

    })




})

app.post('/saveplant', (req, res) => {
    let id = req.body.id
    db.query("UPDATE plants SET plant_map = 1 WHERE plant_id=?", id, (err, data) => {
        if (err) {
            console.log(err)
        }
    })
})



app.get('/addplanten', (req, res) => {
    const sql = "SELECT * FROM plants";
    db.query(sql, (err, data) => {
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

app.get('/plantenmap', (req, res) => {
    const sql = "SELECT * FROM plants WHERE plant_map=1";
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
    let plantid;
    const sql = ["INSERT INTO plants (plant_id, plant_name, plant_family, plant_hoofdgroep, plant_color, invasive, plant_map) VALUES (NULL, ?,?,?,?,?,0)",
        "INSERT INTO plant_watcher (plant_id, plant_watched) VALUES((SELECT MAX(plant_id) FROM plants), 0)",
        "INSERT into plant_database.plant_prop_watcher(plant_id, property_id, plop_watch) select distinct ?, property_id, 0 from plant_database.properties"]
    let insertplant = db.query(sql[0], [insertData.name, insertData.family, insertData.group, insertData.color, insertData.invasive], (err, data) => {
        if (err) {
            console.log(err)
        }
    })
    let watcher = db.query(sql[1], 0, (err, data) => {
        if (err) {
            console.log(err)
        }
        let setwatchers = db.query(sql[2],data.insertId, (err,data) => {
        })
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

    let einde = []
    const registerWatch = [{ getProperties: ["SELECT * FROM properties where property_id=?", "SELECT DISTINCT ?? FROM plants"] }, { getData: "SELECT * FROM properties  AS kenmerken JOIN property_watcher AS pw ON pw.property_id = kenmerken.property_id WHERE kenmerken.property_id=?" }, { postData: "UPDATE property_watcher SET property_watched=? WHERE property_id = ?" }]

    db.query(registerWatch[0].getProperties[0], req.body.id, (err, data) => {

        let searchFor = data[0].property_name // naam van de property in database


        let go = db.query(registerWatch[0].getProperties[1], searchFor, (err, data) => {
            einde.push({ property_data: data })
        })

        db.query(registerWatch[1].getData, id, (err, data) => {
            let result = data

            einde.push({ watch_data: data[0] })
            postData(Number(result[0].property_watched))

            function postData(result) {
                db.query(registerWatch[2].postData, [(result + 1), id], (err, data) => {
                })
            }
            return res.json(einde)

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





app.post('/rekenen', (req, res) => {
    if (req.body[0].method === 'maxPlant') {
        const sql = "SELECT plants.plant_id,  plants.plant_name, plants.plant_family, plants.plant_hoofdgroep, plants.plant_color, plants.invasive, pw.plant_watched FROM plants LEFT JOIN plant_watcher AS pw ON plants.plant_id=pw.plant_id";
        db.query(sql, (err, data) => {
            let plants = data;
            let maxValue = 0; // set this value as number
            let maxPlant;
            plants.map((plant) => {
                maxValue = Math.max(maxValue, Number(plant.plant_watched));
                if (maxValue === Number(plant.plant_watched)) { // find the plant that has the highest value for plant_watched
                    maxPlant = plant;
                }
            });

            return res.json(maxPlant)
        })
    }
    if (req.body[0].method === 'maxProperty') {
        const sql = "SELECT properties.property_id, properties.property_name, pw.property_watched FROM properties LEFT JOIN property_watcher AS pw ON properties.property_id=pw.property_id";
        db.query(sql, (err, data) => {
            let maxValue = 0;
            let maxProperty;
            data.map((property) => {
                maxValue = Math.max(maxValue, Number(property.property_watched));
                if (maxValue === Number(property.property_watched)) {
                    maxProperty = property
                }

            });
            return res.json(maxProperty)
        })
    }

    if (req.body[0].method === 'suggestion1') {
        const sql = "SELECT plants.*, pw.plant_watched FROM plants LEFT JOIN plant_watcher AS pw ON pw.plant_id=plants.plant_id WHERE ?? = ? ";
        db.query(sql, [req.body[0].helper[1], req.body[0].helper[0]], (err, data) => {
            let plants = data;
            let minValue = 1290867; // set this value as number
            let minPlant;
            plants.map((plant) => {
                minValue = Math.min(minValue, Number(plant.plant_watched));
                if (minValue == Number(plant.plant_watched)) { // find the plant that has the highest value for plant_watched
                    minPlant = plant;
                }
            });
            return res.json(minPlant)
        })
    }

    if (req.body[0].method === 'plantvisit') {
       let plantID = req.body[0].helper
       console.log(plantID)
       const sql = "SELECT property_id, plop_watch FROM plant_prop_watcher where plant_id=? ";
       db.query(sql,plantID, (err, data) => { 
        console.log(data)
       })

    }
})







app.listen(3307, () => {
    console.log('server luistert')
})






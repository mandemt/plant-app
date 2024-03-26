import React, { useState, useEffect } from 'react'
import plantenMapIcon from './img/plantenmap.svg'
import plaatje from './img/duizendknopen.jpg'
import './styling/plantenmap.scss';

class identifyPlant extends React.Component {
    componentDidMount() {
    }
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
            plantName: 'loading'
        }

    }

    async fetchPlants(img) {
        let body = new FormData;
        let plaatje = URL.createObjectURL(img)
        body.append("images", img)
        body.append("organs", "leaf")
        fetch('https://my-api.plantnet.org/v2/identify/all?include-related-images=false&no-reject=false&lang=en&type=legacy&api-key=2b10Qo4Dc15tRmkloqUvnqe', {
    body, headers: {
                Accept: "image/*"
            },
            method: "POST"
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data.results[0]);
                let name = data.results[0].species.commonNames[0]
                this.setState({plantName : name})
            });
    }
    savePlant(id) {
        fetch('http://localhost:3307/saveplant', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id })

        })
    }
    plantDetails() {
        if (this.state.newPlant.length !== 0) {
            return (
                <ul>
                    {this.state.newPlant.map((plant) => {
                        return (
                            <>
                                <li><a href={"/planten/" + plant.plant_id}> {plant.plant_name}</a></li>

                            </>
                        )
                    })}
                </ul>
            )
        }

    }
    handleFileInput(e) {
        console.log(e.target.files)
        let img = e.target.files[0]
      
   
        this.fetchPlants(img)
    }

    render() {



        return (

            <div className="plants">
                <div className="banner">
                    <h1>Identificeer plant</h1>
                    <input type="file" onChange={(e) => this.handleFileInput(e)}></input>
            {this.state.plantName}
                </div>
                <p>Bekijk hier jouw opgeslagen planten uit de plantenmap</p>
                <p>plant details  </p>

            </div>
        )

    }
}
export default identifyPlant;
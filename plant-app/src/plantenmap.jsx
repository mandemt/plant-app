import React, { useState, useEffect } from 'react'
import plantenMapIcon from './img/plantenmap.svg'
import './styling/plantenmap.scss';

class Plantenmap extends React.Component {
    componentDidMount() {
        this.fetchPlants()
    }
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
        }

    }

    fetchPlants() {
        const product_id = window.location.href.split("/");
        fetch('http://localhost:3307/plantenmap', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((data) => data.json())
            .then((data) => this.setState({ newPlant: data }))
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
                            <li><a href={"/planten/" + plant.plant_id}> {plant.plant_name}</a></li>



                        )
                    })}
                </ul>
            )
        }

    }

    render() {



        return (

            <div className="plants">
                <div className="banner">
                    <h1>plantenmap</h1>
                    <figure>
                    <img src={plantenMapIcon}></img>
                    </figure>
                </div>
                <p>Bekijk hier jouw opgeslagen planten uit de plantenmap</p>
                {this.plantDetails()}
                <p>plant details  </p>

            </div>
        )

    }
}
export default Plantenmap;
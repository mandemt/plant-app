import React, { useState, useEffect } from 'react'

class Plants extends React.Component {
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
        fetch('http://localhost:3307/planten/:id', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{ id: product_id[4] }])
        })
            .then((data) => data.json())
            .then((data) => this.setState({ newPlant: data }))
    }
    savePlant(id){
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
                <div className="plants">
                    {this.state.newPlant.map((plant) => {
                        return (
                            <div>
                                <div className="banner">
                                <h1>{plant.plant_name}</h1>
                                <img></img>
                                </div>
                                <ul>
                                <button onClick={() => this.savePlant(plant.plant_id)}>sla plant op</button>

                                <p> Plant familie:{plant.plant_family}</p>
                                <p> Plant kleur: {plant.plant_color}</p>
                                <p> Plant hoofdgroep: {plant.plant_hoofdgroep}</p>
                                <p> Plant ID {plant.plant_id}</p>
                                <p> Aantal keer deze plant bekeken {plant.plant_watched}</p>
                                </ul>

                            </div>

                        )
                    })}
                </div>
            )
        }

    }

    render() {



        return (

            <div>
                {this.plantDetails()}
                <p>plant details  </p>

            </div>
        )

    }
}
export default Plants;
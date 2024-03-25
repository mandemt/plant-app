import React, { useState, useEffect } from 'react'
import propImg from './img/duizendknopen.jpg'

class Plants extends React.Component {
    componentDidMount() {
        this.fetchPlants()
    }
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
            family: null
        }
        this.toggleClass = this.toggleClass.bind(this)

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
    registerWatch(plantWatchInfo){
        console.log(plantWatchInfo)
        fetch('http://localhost:3307/planten/:id/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plantWatchInfo)
        })
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
    toggleClass(e) {
        let plantWatchInfo = [e.target.id]
        let property = e.target.className
        if(this.state[property] === 'set'){
            this.setState({[property] : null})
        }
        else{
        this.setState({ [property]: 'set' })
            this.registerWatch([plantWatchInfo, e.target.className])
        }
    };
    plantDetails() {
        if (this.state.newPlant.length !== 0) {

            return (
                <div className="plant">
                    {this.state.newPlant.map((plant) => {
                        return (
                            <div>
                                <div className="banner">
                                    <h1>{plant.plant_name}</h1>
                                    <figure>
                                        <img src={propImg}></img>
                                    </figure>
                                </div>
                                <ul>
                                    <button onClick={() => this.savePlant(plant.plant_id)}>sla plant op</button>

                                    <p className="plant_family" id={plant.plant_id} onClick={(e) => this.toggleClass(e)}> Plant familie:<p className={this.state.plant_family ? null : "showinfo"}>{plant.plant_family}</p></p>
                                    <p className="color" onClick={(e) => this.toggleClass(e)}> Plant kleur:<p className={this.state.color ? null : "showinfo"}>{plant.plant_color}</p></p>
                                    <p className="hoofdgroep" onClick={(e) => this.toggleClass(e)}> Plant hoofdgroep:<p className={this.state.hoofdgroep ? null : "showinfo"}>{plant.plant_hoofdgroep}</p></p>
                                    <p className="plantid" onClick={(e) => this.toggleClass(e)}> Plant ID:<p className={this.state.plantid ? null : "showinfo"}>{plant.plant_id}</p></p>
                                    <p className="bekeken" onClick={(e) => this.toggleClass(e)}> Plant bekeken:<p className={this.state.bekeken ? null : "showinfo"}>{plant.plant_watched}</p></p>
                                    <p className="invasief" onClick={(e) => this.toggleClass(e)}> Plant invasief:<p className={this.state.invasief ? null : "showinfo"}>{plant.invasive}</p></p>

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
import React, { useState, useEffect } from 'react'
import './styling/suggestion.scss'
class Calculate extends React.Component {
    componentDidMount() {
        this.fetchProperties()
    }
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
            plants: [],
            properties: [],
            maxProp: [],
            suggestion: []
        }

    }

    fetchPlants(e) {
        fetch('http://localhost:3307/rekenen', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{ method: 'maxPlant' }])
        })
            .then((data) => data.json())
            .then((data) => this.setState({ plants: data }))

    }
    fetchProperties() {
        fetch('http://localhost:3307/rekenen', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{ method: 'maxProperty' }]) // indicate that the SQL query for properties has to be run in order to find the most watched property.
        })
            .then((data) => data.json())
            .then((data) => this.setState({ properties: data }))

    }
    fetchNewSuggestion(e) {
        fetch('http://localhost:3307/rekenen', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{ method: 'suggestion1', helper: e }])
        })
            .then((data) => data.json())
            .then((data) => this.setState({ suggestion: data }))

    }
    maxPlant() {
        if (this.state.plants.length !== 0) { // if fetching is done
            let maxPlant = this.state.plants
            return (
                <>De meest bekeken plant is de {maxPlant.plant_name}, die is {maxPlant.plant_watched}  maal bekeken. Hier zijn nog een aantal kenmerken:
                    <p> Plant familie:{maxPlant.plant_family}</p>
                    <p> Plant kleur: {maxPlant.plant_color}</p>
                    <p> Plant hoofdgroep: {maxPlant.plant_hoofdgroep}</p>
                    <p> Plant ID {maxPlant.plant_id}</p>
                </>
            )
        }
        else {
            this.fetchPlants()
        }
    }

    maxProperty() {
        if (this.state.properties.length !== 0) {

            let maxProperty = this.state.properties

            return (
                <>Het meest bekeken kenmerk is de {maxProperty.property_name}, die is {maxProperty.property_watched} maal bekeken.
                </>
            )

        }
        else {
            this.fetchProperties()
        }
    }

    suggestPlantfromProperty() {
        if (this.state.suggestion.length !== 0) {
            console.log(this.state.suggestion)
        }
        else {
            if (this.state.properties.length !== 0) {
                let naam = this.state.properties.property_name

                this.fetchNewSuggestion([this.state.plants[naam], naam])
            }
        }
    }
    confirmedSuggestion(){
        console.log('confirm')
    }
    declineSuggestion(){
        console.log('decline')
    }
    render() {


        return (

            <div>
                <h1>Eerste berekening: meest bekeken PLANT</h1>
                {this.maxPlant()}
                <h1>Tweede berekening: meest bekeken KENMERK</h1>
                {this.maxProperty()}
                <br />
                <br />
                <br />
                <h1>Ontdekken: Een tweede stap is om de minst bekeken plant waarvan het meest bekeken kenmerk van de meest bekeken plant overeenkomt.</h1>
                {this.suggestPlantfromProperty()}
                <a href={"/planten/" + this.state.suggestion.plant_id}> <h1>{this.state.suggestion.plant_name}</h1></a> is het minst bekeken, van het meest bekeken kenmerk <a href={"/kenmerken/" + this.state.properties.property_id} ><h1>{this.state.properties.property_name}</h1></a> van de meest bekeken plant <a href={"/planten/" + this.state.plants.plant_id}> <h1>{this.state.plants.plant_name}</h1></a>
                <div className="confirm">
                    <p>Geef hier aan of je blij bent met deze suggestie:</p>
                    <div>
                    <button onClick={() => this.confirmedSuggestion()}>V</button><button onClick={() => this.declineSuggestion()}>X</button>
                    </div>
                    </div>
            </div>
        )

    }
}
export default Calculate;
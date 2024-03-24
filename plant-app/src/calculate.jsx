import React, { useState, useEffect } from 'react'

class Calculate extends React.Component {
    componentDidMount() {
    }
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
            plants: [],
            properties: []
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
            body: JSON.stringify([{ method: 'maxProperty' }])
        })
        .then((data) => data.json())
        .then((data) => this.setState({ properties: data }))
    }
    maxPlant() {
        if (this.state.plants.length !== 0) {
            let plants = this.state.plants;
            let maxValue = 0;
            let maxPlant;
            plants.map((el) => {
                maxValue = Math.max(maxValue, Number(el.plant_watched));
                if (maxValue === Number(el.plant_watched)) {
                    maxPlant = el;
                }
            });
            console.log(maxValue)
            return (
                <>De meest bekeken plant is de {maxPlant.plant_name}, die is {maxValue} maal bekeken. Hier zijn nog een aantal kenmerken:
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
            let properties = this.state.properties;
        console.log(this.state.properties)

            let maxValue = 0;
            let maxProperty;
            properties.map((el) => {
                maxValue = Math.max(maxValue, Number(el.property_watched));
                if(maxValue === Number(el.property_watched)){
                    maxProperty = [el]
                }
              });
              return (
                <>Het meest bekeken kenmerk is de {maxProperty[0].property_name}, die is {maxValue} maal bekeken. 
                </>
            )
              console.log(maxValue)

        }
        else {
            this.fetchProperties()
        }
    }
    render() {


        return (

            <div>
                <h1>Eerste berekening: meest bekeken PLANT</h1>
                {this.maxPlant()}
                <h1>Tweede berekening: meest bekeken KENMERK</h1>
                {this.maxProperty()}
            </div>
        )

    }
}
export default Calculate;
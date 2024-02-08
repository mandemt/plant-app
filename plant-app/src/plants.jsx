import React, { useState } from 'react'

class Plants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoi: [
                { name: 'plant', family: 'family', group: 'group', color: 'color', invasive: 'invasive' }
            ],
            plants: [],
            newPlant: 'default'
        }
        this.fetchPlants = this.fetchPlants.bind(this)
        this.postPlants = this.postPlants.bind(this)
        this.changeValue = this.changeValue.bind(this)
     
    }
    fetchPlants(e) {
        console.log(this.state.plants)
if(this.state.plants.length == 0){
        fetch('http://localhost:3307/planten')
            .then(res => res.json())
            .then(data => this.setState({ plants: data }))
            .then(console.log('hoi'))
            .catch(error => console.log(error))
}

    }
    postPlants(e) {
        const postData = [{
            name: this.state.plantname,
            family: this.state.plantfamily,
            group: this.state.plantgroup,
            color: this.state.plantcolor,
            invasive: this.state.invasive
        }]
        fetch('http://localhost:3307/anders', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        })

    }

    changeValue(e) {
        let stateName = e.target.id
        this.setState({ [e.target.id]: e.target.value })
        console.log(this.state.plantname)
        console.log(stateName)
    }

    render() {

        let planten = this.state.plants.map(plant => {
            let link = plant.id
            return (
                <a href={'planten/' + link} key={plant.id}>{plant.plant_name}</a>
            )
        })

        return (

            <div className="plantinputs">
                Plant naam  <input id="plantname" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                Plant familie  <input id="plantfamily" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                Plant hoofdgroep  <input id="plantgroup" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                Plant bloemkleur  <input id="plantcolor" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                Invasief <input id="invasive" onChange={(e) => { this.changeValue(e) }} type="text"></input>

                <button onClick={() => this.fetchPlants()}>klik</button>
                <input onChange={(e) => {
                    this.changeValue(e)
                }} type="text"></input> <button value="['tom','plant']" onClick={(e) => this.postPlants(e)}>post plant</button>

                {planten}
            </div>
        )

    }
}
export default Plants;
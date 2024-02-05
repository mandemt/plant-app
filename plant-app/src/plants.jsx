import React, { useState } from 'react'

class Plants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoi: [
                { name: 'tom', age: '2' }
            ],
            newPlant: 'default'
        }
        this.fetchPlants = this.fetchPlants.bind(this)
        this.postPlants = this.postPlants.bind(this)
        this.changeValue = this.changeValue.bind(this)

    }
    fetchPlants(e) {

        fetch('http://localhost:3307/planten')
            .then(res => res.json())
            .then(data => this.setState({ hoi: data }))
            .then(console.log('hoi'))
            .catch(error => console.log(error))


    }
    postPlants(e) {
        const postData = [{ name: this.state.newPlant }]
        console.log(postData)
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

        let planten = this.state.hoi.map(plant => {
            let link = plant.id
            return (
                <a href={link} key={plant.id}>{plant.plant_name}</a>
            )
        })

        return (

            <div className="plantinputs">
              Plant naam  <input id="plantname"  onChange={(e  ) => {this.changeValue(e) }} type="text"></input> 
              Plant familie  <input id="plantname"  onChange={(e  ) => {this.changeValue(e) }} type="text"></input> 
              Plant hoofdgroep  <input id="plantname"  onChange={(e  ) => {this.changeValue(e) }} type="text"></input> 
              Plant bloemkleur  <input id="plantname"  onChange={(e  ) => {this.changeValue(e) }} type="text"></input> 
             Invasief <input id="plantname"  onChange={(e  ) => {this.changeValue(e) }} type="text"></input> 

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
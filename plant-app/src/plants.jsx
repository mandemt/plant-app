import React, { useState } from 'react'
import './plants.scss';
import discoverIcon from './img/ontdekken.svg'

class Plants extends React.Component {
    componentDidMount() {
        this.fetchPlants()
    }
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            plants: [],
            newPlant: 'default',
            incomplete: []
        }
        this.fetchPlants = this.fetchPlants.bind(this)
        this.changeValue = this.changeValue.bind(this)

    }
    fetchPlants(e) {
        fetch('http://localhost:3307/planten')
            .then(res => res.json())
            .then(data => this.setState({ plants: data }))
            .catch(error => console.log(error))

    }


    changeValue(e) {
        let stateName = e.target.id
        this.setState({ [e.target.id]: e.target.value })
    }
    planten() {
        let errorMessage = this.state.errorMessage
        let planten = this.state.plants
        return (
            <ul>
                {planten.map(plant => {
                    return (
                       <li><a href={'planten/' + plant.plant_id} onClick={() => checkID(e)} key={plant.plant_id}>{plant.plant_name}</a></li> 
                    )
                })
                }
                </ul>)
    }
                render() {


        return (

                <div className="plants">
                    <div className="banner">
                    <h1>{this.props.title}</h1>
                    <figure>
                    <img src={discoverIcon}></img></figure>
                    </div>
                    {this.planten()}
                </div>
                )

    }
}
                export default Plants;
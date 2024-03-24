import React, { useState } from 'react'

class addPlants extends React.Component {
    componentDidMount() {
    }
    constructor(props) {
        super(props);

        this.state = {
            errorMessage: '',
            plants: [],
            newPlant: 'default',
            incomplete: []
        }
        this.postPlants = this.postPlants.bind(this)
        this.changeValue = this.changeValue.bind(this)

    }

    postPlants(e) {
        let incomplete = []
        const postData = [{
            name: this.state.plantname,
            family: this.state.plantfamily,
            group: this.state.plantgroup,
            color: this.state.plantcolor,
            invasive: this.state.invasive
        }]
        let formFields = Object.keys(postData[0])

        formFields.forEach((data) => {
            if (postData[0][data] == undefined) {
                incomplete.push(data)
                this.setState({ errorMessage: "de volgende velden zijn niet ingevuld:" + incomplete })
            }


        })
        this.setState({ incomplete: incomplete })
        if (incomplete.length == 0) {
            fetch('http://localhost:3307/anders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })
        }
    }

    changeValue(e) {
        let stateName = e.target.id
        this.setState({ [e.target.id]: e.target.value })
    }

    render() {
        let errorMessage = this.state.errorMessage


        return (
            <>
                    <h1>{this.props.title}</h1>

                <div className="plantinputs">

                    Plant naam  <input id="plantname" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                    Plant familie  <input id="plantfamily" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                    Plant hoofdgroep  <input id="plantgroup" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                    Plant bloemkleur  <input id="plantcolor" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                    Invasief <input id="invasive" onChange={(e) => { this.changeValue(e) }} type="text"></input>
                    <button value="['tom','plant']" onClick={(e) => this.postPlants(e)}>post plant</button>
                    {errorMessage}
                </div>
            </>
        )

    }
}
export default addPlants;
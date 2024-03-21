import React, { useState, useEffect } from 'react'

class Property extends React.Component {
    componentDidMount() {
        this.fetchPlants()
        console.log('yo')
    }
    constructor(props) {
        super(props);

        this.state = {
            property: [],
            results: []
        }

    }

    fetchPlants() {
        let postData = {id: Number(window.location.href.split("/")[4])}
        console.log(postData)
        fetch('http://localhost:3307/kenmerken/:id', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        })
            .then((data) => data.json())
            .then((data) => this.setState({ results: data }))
            .then(console.log(this.state.results));
    }


    render() {



        return (

            <div>
              {this.state.results.map((property) => {
                            return (
                                <div>
                                    <p> Kenmerk:<a href={'/kenmerken/' + property.plant_family}>{property.plant_family}</a></p>
                                    

                                </div>

                            )
                        })}
            </div>
        )

    }
}
export default Property;
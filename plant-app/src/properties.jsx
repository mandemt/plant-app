import React, { useState, useEffect } from 'react'

class Properties extends React.Component {
    componentDidMount() {
        this.fetchPlants()
    }
    constructor(props) {
        super(props);

        this.state = {
            properties: []
        }

    }

    fetchPlants() {
        fetch('http://localhost:3307/kenmerken', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((data) => data.json())
            .then((data) => this.setState({ properties: data }))
            .then(console.log(this.state.properties));
    }


    render() {



        return (

            <div className="banner">
                <h1>{this.props.title}</h1>
              {this.state.properties.map((property) => {
                            return (
                                <div>
                                    <p> Kenmerk:<a href={'/kenmerken/' + property.property_id}>{property.property_name}</a></p>
                                    

                                </div>

                            )
                        })}
            </div>
        )

    }
}
export default Properties;
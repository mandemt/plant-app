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
            results: [],
            propname: '',
            postData: {}
        }
        this.plantMap = this.plantMap.bind(this)

    }

    fetchPlants() {
        let postData = { id: Number(window.location.href.split("/")[4]) }
        this.setState({ postData: postData })
        fetch('http://localhost:3307/kenmerken/:id', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        })
            .then((data) => data.json())
            .then((data) => this.setState({ results: data }))
            .then(console.log(this.state.results))

    }

    plantMap() {


        let props;

        let typen;
        if (this.state.results.length !== 0) {
            props = this.state.results[0].property_data
            typen = this.state.postData

            return (
                <>
                    {Object.keys(props).map(function (key) {
                        let value = Object.values(props)[key]
                        return (
                            <div>
                                <a href={"/kenmerken/" + typen.id + "/" + Object.values(value)}>{Object.values(value)}</a>
                            </div>
                        )
                    })}
                </>)

        }
    }

    watchMap() {
        let watchData;
        if (this.state.results.length !== 0) {
            watchData = this.state.results[1].watch_data.property_watched
            console.log(watchData)
            return (
                <h3>{watchData}</h3>

            )
        }
    }


    render() {

        return (
            <div>

                {this.plantMap()}
                {this.watchMap()}
            </div>
        )

    }
}
export default Property;
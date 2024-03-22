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

    }

    fetchPlants() {
        let postData = { id: Number(window.location.href.split("/")[4]) }
        this.setState({postData: postData})
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


    render() {
        let props = this.state.results
        let typen = this.state.postData
        return (
            <div>
                {
                            
                    
                    Object.keys(props).map(function (key) {
                        let value = props[key]
                        return (
                            <div>
                            <a href={"/kenmerken/" + typen.id + "/" + Object.values(value)}>{Object.values(value)}</a>
                           </div>
                        )
                    })
                }
            </div>
        )

    }
}
export default Property;
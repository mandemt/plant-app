import React, { useState, useEffect } from 'react'

class PropertyList extends React.Component {
    componentDidMount() {
        this.fetchPlants()

    }
    constructor(props) {
        super(props);

        this.state = {
            property: [],
            results: [],
            propname: '',
            plants: [],
            postData: []
        }
        this.fetchPlants = this.fetchPlants.bind(this)
        this.propertyMap = this.propertyMap.bind(this)
        this.titleGenerator = this.titleGenerator.bind(this)
    }

    fetchPlants() {
        let url = window.location.href.split("/")
        let postData = { propId: url[4], propName: decodeURI(url[5]) }
        this.setState({ postData: postData })
        fetch('http://localhost:3307/kenmerken/:id/:id', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .then(data => this.setState({ plants: data }))
            .catch(error => console.log(error))


    }
    titleGenerator() {
        let properties;
        if (this.state.plants.length !== 0) {
            properties = this.state.plants['property_info']

            return (
                <>
                    <h2>Kenmerk: {properties.property_name}, {this.state.postData.propName}</h2>
                </>
            )
        }
        else {
            return (
                <h1>loadin</h1>
            )
        }
       

    }

    propertyMap() {



        let planten;
        if (this.state.plants.length !== 0) {
            planten = this.state.plants
            return(
<>
           { planten['plant_info'].map(function(item, i){
          return(  <a href={'/planten/' + item.plant_id}>{item.plant_name}</a>)  
              })}
           </>   )

        }
        else {
            return (
                <>fhsd</>
            )
        }
    }

    render() {


        return (
            <div>
                {this.titleGenerator()}
                Planten met dit gedeelde kenmerk:
                {this.propertyMap()}


            </div>
        )
    }
}
export default PropertyList;
import React, { useState } from 'react'

class Plants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
        }

    }
    fetchPlants(){
        // if(this.state.newPlant.length == 0){
        //     const product_id = window.location.href.split("/");
        //     console.log(product_id[4])
        //     let postData = [{ id: product_id[4] }]
        //     fetch('http://localhost:3307/planten/:id', {
        //         method: 'POST',
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(postData)
        //     })
        //         .then(res => res.json())
        //         .then(data => this.setState({ newPlant: data }))
        //         .then(console.log(this.state.newPlant))
        //         .catch(error => console.log(error))
        // // }
        const product_id = window.location.href.split("/");
        fetch('http://localhost:3307/planten/:id', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify([{id: product_id[4]}])
        })
        .then((data) => data.json())
        .then((data) => this.setState({newPlant: data}))
        .then(console.log(this.state.newPlant));
    }
        

    render() {
  


        return (
            <div>
                <button onClick={() => this.fetchPlants()}>klik</button>
                <p>plant details  </p>
                {this.state.newPlant.length !== 0 &&
                    <div>
                            {this.state.newPlant.map((plant) => {
                                return (
                                    <div>
                             <p>  Plantnaam: {plant.plant_name}</p>
                              <p> Plant familie:{ plant.plant_family}</p>
                               <p>Plant kleur: {plant.plant_bloemkleur}</p>
                             <p>  Plant hoofdgroep: {plant.plant_hoofdgroep}</p>
                               <p>Plant ID {plant.plant_id}</p>
                              <p>  Aantal keer deze plant bekeken {plant.watched}</p>


                                </div>
                                
                                )
                            })}
                    </div>
                }
            </div>
        )

    }
}
export default Plants;
import React, { useState } from 'react'

class Plants extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newPlant: [],
        }

    }

        

    render() {
        if(this.state.newPlant.length == 0){
            const product_id = window.location.href.split("/");
            console.log(product_id[4])
            let postData = [{ id: product_id[4] }]
            fetch('http://localhost:3307/planten/:id', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData)
            })
                .then(res => res.json())
                .then(data => this.setState({ newPlant: data }))
                .then(console.log(this.state.newPlant))
                .catch(error => console.log(error))
        }


        return (
            <div>
                < h1>plant details  </h1>
                {this.state.newPlant.length !== 0 &&
                    <div>a
                        <h1>{this.state.newPlant.length}</h1>
                            {this.state.newPlant.map((plant) => {
                                return (
                                    <div>
                                <h1>{plant.plant_name}</h1>
                                <h1>{plant.plant_family}</h1>
                                <h1>{plant.plant_bloemkleur}</h1>
                                <h1>{plant.plant_hoofdgroep}</h1>
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
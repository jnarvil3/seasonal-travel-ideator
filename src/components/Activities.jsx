import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Activities extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        let newItineraries = [];

        let randomIndex = (Math.floor(Math.random()*this.props.itineraries.length*10))%this.props.itineraries.length;
        // for(let i = 0; i < this.state.itineraries.length; i++){
        //     console.log(this.state.itineraries[i])
            newItineraries.push(<Itinerary itineraries={this.props.itineraries[randomIndex]}/>)
        
        return (
            [newItineraries]
            )
    }
}

    //Fetch logic
    // componentDidMount(){
    //     fetch('/itinerary')
    //     .then(res => res.json())
    //     .then((itinerariesFromFetch) => {
    //         return this.setState({itineraries: itinerariesFromFetch})
    //     })
    //     .catch(err => console.log('Activities.componentDidMount: fetch itineraries: ERROR: ', err))
    // }

export default Activities;
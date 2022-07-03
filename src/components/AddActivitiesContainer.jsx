import React, { Component } from 'react';

class AddActivitiesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
                locationInput: '',
                seasonInput: '',
                activityInput: '',
                submissionAdded: false
        }
        this.getInputValueForLocation = this.getInputValueForLocation.bind(this);
        this.getInputValueForSeason = this.getInputValueForSeason.bind(this);
        this.getInputValueForActivity = this.getInputValueForActivity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    getInputValueForLocation(event){
        const locationInputValue = event.target.value;
        this.setState({
            locationInput: locationInputValue,
            submissionAdded: false
        })
    }

    getInputValueForSeason(event){
        const seasonInputValue = event.target.value;
        this.setState({
            seasonInput: seasonInputValue,
            submissionAdded: false
        })
    }

    getInputValueForActivity(event){
        const activityInputValue = event.target.value;
        this.setState({
            activityInput: activityInputValue,
            submissionAdded: false
        })
    }

    handleSubmit(event) {
        console.log('A location was submitted: ' + this.state.locationInput);
        console.log('A season was submitted: ' + this.state.seasonInput);
        console.log('A activity was submitted: ' + this.state.activityInput);
        event.preventDefault();
        let location = this.state.locationInput;
        let season = this.state.seasonInput;
        let activity = this.state.activityInput;
        
        fetch(`http://localhost:3000/itinerary/${location}/${season}/${activity}`,{
            method: 'POST',
            headers: {
                Accept: 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                location: this.state.locationInput,
                season: this.state.seasonInput,
                activities: this.state.activityInput
            })
        })
        .then(res => {
            this.setState({
                submissionAdded: true
            })
            return res.json()
        })
        .then(response => {
            console.log("Response added!")
        })
        .catch(err => console.log('AddActivitiesContainer.sendInputsToDatabase: ERROR: ', err))
    }
    


  

    render(){
        console.log('this.state.locationInput:', this.state.locationInput)
        console.log('this.state.seasonInput:', this.state.seasonInput)
        console.log('this.state.activityInput:', this.state.activityInput)
        console.log(this.state)
        let succesfulText;

        if(this.state.submissionAdded === true){
            console.log('hey')
            succesfulText = 'Experience added!'
        }

        return(
            <div className='addActivitiesContainer subContainer'>
                <br></br>
                <h2>
                <em>Have you had an amazing travel experience?</em>
                </h2>
                <h3>
                <em>Want to inspire others? 🌏</em>
                </h3>
                <div className='addActivityInputs'>
                <form onSubmit={this.handleSubmit}>
                    <input id="locationInput" placeholder='Where was it?' onChange={this.getInputValueForLocation} value={this.state.locationInput} ></input>
                        <input id="seasonInput" placeholder='Which season was it?' onChange={this.getInputValueForSeason} value={this.state.seasonInput}></input>
                        <input id="activityInput" placeholder='What did you do?' onChange={this.getInputValueForActivity} value={this.state.activityInput}></input>
                        <span className='successfulText'>{succesfulText}</span>
                </form>
                </div>
                <button id='addActivityButton' onClick={this.handleSubmit}>Add your experience for others to see!</button>
                <br></br>
            </div>        
        )
    }
}

export default AddActivitiesContainer;
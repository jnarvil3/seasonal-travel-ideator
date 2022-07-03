import React, { Component } from 'react';

class UpdateActivitiesContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            _idInput: '',
            locationInput: '',
            seasonInput: '',
            activityInput: '',
            submissionAdded: false
        }
        this.getInputValueForId = this.getInputValueForId.bind(this);
        this.getInputValueForLocation = this.getInputValueForLocation.bind(this);
        this.getInputValueForSeason = this.getInputValueForSeason.bind(this);
        this.getInputValueForActivity = this.getInputValueForActivity.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getInputValueForId(event){
        const IdInputValue = event.target.value;
        this.setState({
            _idInput: IdInputValue,
            submissionAdded: false
        })
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
       
        event.preventDefault();
        let idNum = this.state._idInput;
        let location = this.state.locationInput;
        let season = this.state.seasonInput;
        let activity = this.state.activityInput;
        
        fetch(`http://localhost:3000/itinerary/${idNum}/${location}/${season}/${activity}`,{
            method: 'PUT',
            mode: 'cors',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify({
                _id: this.state._idInput,
                location: this.state.locationInput,
                season: this.state.seasonInput,
                activity: this.state.activityInput
            })
        })
        .then(res => {
            this.setState({
                submissionAdded: true
            })
            return res.json()
        })
        .then(response => {
            console.log(`Experience #${idNum} updated in the database.`)
        })
        .catch(err => console.log('DeleteActivityContainer.handleSubmit: ERROR: ', err))
    }

    render(){

        let succesfulText;

        if(this.state.submissionAdded === true){
            console.log('hey')
            succesfulText = 'Experience updated!'
        }

        return(
            <div className='updateActivitiesContainer subContainer'>
                <br></br>
                <h2>
                <em>Spot a typo? 👀</em>
                </h2>
                <h3>
                <em>🔨 Can you help us fix it? 🔧</em>
                </h3>
                <div className='addActivityInputs'>
                <form onSubmit={this.handleSubmit}>
                    <input id="deleteExperienceButton" placeholder='What was the experience number?' onChange={this.getInputValueForId} value={this.state._idInput} ></input>
                    <input id="deleteExperienceButton" placeholder='What should the location say?' onChange={this.getInputValueForLocation} value={this.state.locationInput} ></input>
                    <input id="deleteExperienceButton" placeholder='What should the season say?' onChange={this.getInputValueForSeason} value={this.state.seasonInput} ></input>
                    <input id="deleteExperienceButton" placeholder='What should the location say?' onChange={this.getInputValueForActivity} value={this.state.activityInput} ></input>
                </form>
                </div>
                <span className='successfulText'>{succesfulText}</span>
                <button id='addActivityButton' onClick={this.handleSubmit}>Update this experience</button>
                <br></br>
            </div>        
        )
    }
}

export default UpdateActivitiesContainer;
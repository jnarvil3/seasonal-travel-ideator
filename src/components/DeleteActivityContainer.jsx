import React, { Component } from 'react';

class DeleteActivityContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            _id: '',
            submissionAdded: false
        }
        this.getIdValueForLocation = this.getIdValueForLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getIdValueForLocation(event){
        const targetId = event.target.value;
        this.setState({
            _id: targetId,
            submissionAdded: false
        })
    }

    handleSubmit(event) {
       
        event.preventDefault();
        let idNum = this.state._id;
        
        fetch(`http://localhost:3000/itinerary/${idNum}`,{
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Accept: 'application/json'
            },
            body: JSON.stringify({
                _id: this.state._id,
            })
        })
        .then(res => {
            this.setState({
                submissionAdded: true
            })
            return res.json()
        })
        .then(response => {
            console.log(`Experience #${idNum} deleted from the database.`)
        })
        .catch(err => console.log('DeleteActivityContainer.handleSubmit: ERROR: ', err))
    }

    render(){

        let succesfulText;

        if(this.state.submissionAdded === true){
            console.log('hey')
            succesfulText = 'Experience deleted!'
        }

        return(
            <div className='deleteActivityContainer subContainer'>
                <br></br>
                <br></br>
                <h2>
                <em>Did the pandemic cancel another amazing experience? Ugh 😞</em>
                </h2>
                <h3>
                <em>♻️ Please us remove it ♻️</em>
                </h3>
                <div className='addActivityInputs'>
                <form onSubmit={this.handleSubmit}>
                    <input id="deleteExperienceButton" placeholder='What was the experience number?' onChange={this.getIdValueForLocation} value={this.state._id} ></input>
                    <span className='successfulText'>{succesfulText}</span>
                </form>
                </div>
                <button id='addActivityButton' onClick={this.handleSubmit}>Remove this experience</button>
                <br></br>
            </div>        
        )
    }
}

export default DeleteActivityContainer;
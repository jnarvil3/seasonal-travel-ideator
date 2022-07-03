import React, { Component } from 'react';
// import { Switch, Route } from 'react-router-dom';
import SeeActivitiesContainer from './SeeActivitiesContainer.jsx'
import AddActivitiesContainer from './AddActivitiesContainer.jsx'
import DeleteActivityContainer from './DeleteActivityContainer.jsx'
import UpdateActivitiesContainer from './UpdateActivitiesContainer.jsx';
import ".././main.scss";


const App = props => {
    return(
        <div>
            <div className='welcomeBackContainer'>
                <h1>
                    Welcome back to your favorite travel itiner-ator. 
                </h1>
            </div>
            <div>
                <SeeActivitiesContainer />
            </div>
            <div>
                <AddActivitiesContainer />
            </div>
            <div>
                <DeleteActivityContainer />
            </div>
            <div>
                <UpdateActivitiesContainer />
            </div>
        </div>
 )
    
};


export default App;

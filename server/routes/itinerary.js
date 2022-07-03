const express = require('express');

const travelController = require('../controller.js');

const router = express.Router();

//Get request for certain records
router.get('/:season',travelController.getActivities,
    (req, res) => {
        //For allowing CORS (otherwise the fetch request gets some cross-origin security error)
        res.set('Access-Control-Allow-Origin', '*');
        //Confirmed that res.locals.matchingItineraries is sending
        return res.status(200).send(res.locals.matchingItineraries);
    }
);

// Post request to add an entry
router.post('/:location/:season/:activities',travelController.addActivities,
    (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');
        return res.status(200).send('Added an entry to the database');
    }
);

//Update request to change an entry
router.put('/:_id/:location/:season/:activities',travelController.updateEntry,
    (req, res) => {
        return res.status(200).send(`Updated experience #${_id} to the database`);
    }
);

//Delete an entry
router.delete('/:idNum',travelController.deleteExperience,
    (req, res) => {
        let id = res.locals.matchingItineraries;
        return res.status(200).send(`Deleted activity ${id} from the database`);
    }
);

//Export the router
module.exports = router;

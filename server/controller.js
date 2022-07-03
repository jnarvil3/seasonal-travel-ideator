const path = require('path');
const db = require(path.join(__dirname,'./models/travelModel.js'));

const travelController = {};

travelController.getActivities = (req, res, next) => {

    // const { season } = req.body;
    // console.log('req.query: ', req.query)
    // const season  = req.query.season;
    // console.log(req.params.id)
    const {season} = req.params;
    const values = [season]
    const mySQLGetQuery = `SELECT TI._id,TI.location, TI.activities FROM travelItineraries TI WHERE TI.season = $1;`

    db.query(mySQLGetQuery, values)
        .then(data => {
            res.locals.matchingItineraries = data.rows;
            return next();
        })
        .catch(err => {
            return next({
                log: 'An error occured in the getActivities middleware'
            })
        })
};

travelController.addActivities = (req, res, next) => {

    const {location} = req.params;
    const {season} = req.params;
    const {activities} = req.params;
    const values = [location, season, activities];
    const mySQLPostQuery = `INSERT INTO travelItineraries (location, season, activities) VALUES($1, $2, $3) RETURNING *;`

    db.query(mySQLPostQuery, values)
        .then(data => {
            console.log('data: ', data)
            res.locals.matchingItineraries = "Database entry successfully added!";
            return next();
        })
        .catch(err => {
            return next({
                log: 'An error occured in the addActivities middleware'
            })
        })
};

travelController.updateEntry = (req, res, next) => {

    // const oldText = 'Atlanta';
    // const newText = 'Atlanta, GA';

    const {_id} = req.params;
    const {location} = req.params;
    const {season} = req.params;
    const {activities} = req.params;

    const values = [_id, location, season, activities];

    const mySQLPutQuery = 'UPDATE travelItineraries SET location = $2, season = $3, activities = $4 WHERE _id = $1;'    

    db.query(mySQLPutQuery,values)
        .then(data => {
            console.log('data: ', data)
            res.locals.matchingItineraries = "Database entry the successfully updated!";
            return next();
        })
        .catch(err => {
            return next({
                log: 'An error occured in the updateLocation middleware'
            })
        })
};

travelController.deleteExperience = (req, res, next) => {

    const {idNum} = req.params;

        const values = [idNum];

        const mySQLPostQuery = 'DELETE FROM travelItineraries WHERE _id = $1;'
        db.query(mySQLPostQuery,values)
            .then(data => {
                res.locals.matchingItineraries = idNum;
                return next();
            })
            .catch(err => {
                return next({
                    log: 'An error occured in the deleteActivities middleware'
                })
            })
    };

//Export the controller
module.exports = travelController;
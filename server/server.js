//Require path dependency
const path = require('path');
//Require express dependency
const express = require('express');
//Make express' invocation accessible with the variable 'app'
const app = express();
//Set the port to port 3000
const PORT = 3000;

/**
 * handle parsing request body
 */
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

 //Cors management
 app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//Import the router
const itineraryRouter = require(path.join(__dirname,'./routes/itinerary.js' ))


//Get request for css style file
// app.u('/styles.css', 
//     (req, res) => {
//         return res.status(200).sendFile(path.join(__dirname,'.././client/styles.css'));
//     }
// );

//Get request for page load
app.use('/itinerary', itineraryRouter);

//404 no endpoint error
app.use((req,res) => {
    return res.status(404).send("Sorry, not found :(");
  });

// Global error handling for middleware
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err : 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });
  
//Port activity information
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
  });

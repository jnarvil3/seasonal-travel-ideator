const { Pool } = require('pg');

const postGres_URI = 'postgres://laauiqjz:cVS_ZAzKjAHu5Sba-R0OOR6so-POSkmh@fanny.db.elephantsql.com/laauiqjz';

const pool = new Pool({
    connectionString: postGres_URI
  });
  
  //Export our query method
  module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };
const pool = require("../models/db");

module.exports = {
  async index(req, res) {
    // get all the adventures and pass them on to the front end
    try {
      // check the DB for all adventures
      const adventureViewLimit = 10;
      const DB_index_response = await pool.query(
        "SELECT * FROM adventures LIMIT $1",
        [adventureViewLimit]
      );
      // if all is well create adventures object and send it away
      const adventures = DB_index_response.rows;
      res.json(adventures);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  },
};

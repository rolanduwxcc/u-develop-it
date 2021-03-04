const express = require("express");
const db = require('./db/database.js');
const { path } = require("osenv");

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Use apiRoutes
app.use('/api', apiRoutes);



//Default response for any request not found - Catch all - LAST
app.use((req, res) => {
  res.status(404).end();
});


//Start server after DB connection
db.on("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

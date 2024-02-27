const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const dealRoutes = require('./routes/deals')
const { connect: DB_connect } = require('./models/index');


DB_connect({});
const app = express();

app.use(bodyParser.json());


// Register routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/deals', dealRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

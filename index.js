const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");

const app = express();

const corsOption = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

//
app.use(
    cookieSession({
      name: "demo-session",
    //   keys: ["COOKIE_SECRET"],  
      secret: "COOKIE_SECRET",
      httpOnly: true,
    })
  );

const db = require('./app/models');

db.sequelize.sync().then(()=>{
    console.log('Synced DB.')
}).catch((err)=>{
    console.log('Failed to sync DB: '+err.message)
})

app.get('/',(req, res)=>{
    res.json({message: 'Welcome to the demo app'});
});

const PORT = process.env.PORT || 8080;

//routes
require('./app/routes/demo.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}.`);
});


const mongoose = require('mongoose')
const       express = require('express');
const app = express()


const MONGO_URL = 'mongodb://localhost/registrodeproductos'

mongoose.connect(MONGO_URL, ({
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false
}))



.then( db => console.log(`Connect to database`) 
)

app.use(session({   
    secret: "ESTE ES MI SECRETO",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        url:MONGO_URL,
        autoReconnect: true 
    })

}));

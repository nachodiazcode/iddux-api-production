const mongoose = require('mongoose')
const       express = require('express');
const app = express()

const MongoUrlDev = "mongodb://localhost:27017/registrodeproductos";
const MongoUrlProd = "mongodb+srv://iddyxadmin:<iddyx1234>@cluster0.crv5m9z.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MongoUrlDev, ({
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

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);//connecting to DB and replac password

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(()=> console.log("DB was connected successfully"));



//Port number
const port = 5000;
//Starting the server
app.listen(port, ()=> {
    console.log("App running at port " + port);
});

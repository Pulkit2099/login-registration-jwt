const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const config = require('./config/config');
const cors=require('cors');
const app = express();

const corsOptions = {
  origin: ['http://localhost:5173'], // Replace with the actual origin of your frontend
  optionsSuccessStatus: 200, // Some legacy browsers (IE 11) may not understand 204
};

app.use(cors(corsOptions));

mongoose.connect(config.databaseUrl,).then(()=>
{
    console.log("connnect succesfully")
}
).catch((err)=>{
    console.log(error)
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL , { //connect to data base
    useNewUrlParser:true,
    useCreateIndex: true
})




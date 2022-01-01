require('dotenv').config();

const express = require('express');

const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const upload = require('./routes/upload');
const productRouter = require('./routes/productRouter')
const paymentRouter = require('./routes/paymentRouter')
const path = require('path')

const app = express();
let port = 3001;
const PORT = process.env.PORT || port;

        app.use(cors());
        app.use(express.json());
        app.use(cookieParser());
        app.use(fileUpload({
            useTempFiles: true
        }))

        //Routes
        app.use('/user',userRouter);
        app.use('/api',categoryRouter);
        app.use('/api',upload);
        app.use('/api',paymentRouter);
        app.use('/api',productRouter);

        //connect to mongodb
        
        const URI = process.env.MONGODB_URL
        mongoose.connect(URI,err => {
            if(err) throw err;
            console.log("connected to MongoDB")
        });

        // app.get('/',(req,res) => {
        //     res.json({msg: "welcome to my store!!!!!!!!"})
        // })

        if(process.env.NODE_ENV === 'production'){
            app.use(express.static('client/build'))
            app.get('*',(req,res) => {
                res.sendFile(path.join(__dirname, 'client' , 'build', 'index.html'))
            })
        }

        app.listen(PORT , () => {
            console.log('Server is running on port', PORT)
        });









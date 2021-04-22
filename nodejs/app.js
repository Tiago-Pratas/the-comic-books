import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connect } from './db/mongoose.js'
import { authRoutes } from './routes/index.js'

//load env variables
dotenv.config();
//connect to mongoDB
connect();

//intialise server
const app = express();
const port = process.env.port || 3000;

//use cookieparser
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 40
    },
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL,
    })
}));

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//use bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//<-- Routes -->
app.use('/auth', authRoutes);

app.listen(port, () => {
    console.log(`Listening on port: ${port} 🚀`);
});
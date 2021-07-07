import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { connect } from './db/mongoose.js';
import cors from 'cors';
import { authRoutes,
    issueRoutes,
    volumeRoutes,
    marketRoutes,
    characterRoutes,
    teamRoutes,
    personRoutes,
    publisherRoutes,
    storyArcRoutes } from './routes/index.js';
import { isAuthenticated } from './middleware/auth.middleware.js';
import './services/passport.js';

//load env variables
dotenv.config();
//connect to mongoDB
connect();

//intialise server
const port = process.env.PORT;
const app = express();


app.set('trust proxy', 1);


//allow CORS
app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL],
    }),
);
console.log(process.env.NODE_ENV);

//use cookieparser
app.use(
    session({
        secret: process.env.APP_SECRET,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 40,
            path: '/',
            domain: '.herokuapp.com',
            sameSite: process.env.NODE_ENV === 'prod' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'prod',
        },
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
    }),
);

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//use bodyparser
app.use(express.json({ limit: '3mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//<-- Routes -->
app.use('/auth', authRoutes);
app.use('/issues', issueRoutes);
app.use('/volumes', volumeRoutes);
app.use('/characters', characterRoutes);
app.use('/teams', teamRoutes);
app.use('/persons', personRoutes);
app.use('/publishers', publisherRoutes);
app.use('/story-arc', storyArcRoutes);
app.use('/market', isAuthenticated, marketRoutes);


//<-- exception handling -->
app.use('*', (req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404;
    return res.json(error);
});
app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unknown error');
});

app.listen(port, () => {
    console.log(`Listening on port: ${port} 🚀`);
});

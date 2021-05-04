import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import hbs from 'express-handlebars';
import { connect } from './db/mongoose.js';
import methodOverride from 'method-override';
import { authRoutes, issueRoutes, volumeRoutes, mainRoutes, marketRoutes } from './routes/index.js';
import { isAuthenticated } from './middleware/auth.middleware.js';
import './services/passport.js';

//load env variables
dotenv.config();
//connect to mongoDB
connect();

//intialise server
const port = process.env.PORT;
const app = express();

//use cookieparser
app.use(
    session({
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 40,
        },
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL,
        }),
    })
);

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

//use bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//initialise method override
app.use(methodOverride('_method'));

//<-- templates -->
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.engine(
    'hbs',
    hbs({
        extname: '.hbs',
        defaultLayout: 'main',
        layoutDir: path.join(__dirname, 'views', 'layout'),
    })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//<-- Routes -->
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/market', isAuthenticated, marketRoutes);
app.use('/volumes', isAuthenticated, volumeRoutes);
app.use('/issues', isAuthenticated, issueRoutes);

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

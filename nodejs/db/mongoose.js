import mongoose from 'mongoose';

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the DB');
    }
    catch (error) {
        console.log('There has been an error connecting with the DB', error)
    }
};

export { connect };
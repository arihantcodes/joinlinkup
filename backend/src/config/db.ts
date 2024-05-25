import mongoose from 'mongoose';

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default ConnectDB;

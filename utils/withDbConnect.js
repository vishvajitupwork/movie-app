import connectDB from '../config/db';

const withDbConnect = (handler) => async (req, res) => {
    try {
        await connectDB();
        return handler(req, res);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default withDbConnect;

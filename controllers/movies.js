const Movie = require('../models/movie');
const User = require('../models/user');

const MovieController = {
    getAllMovies: async (req, res) => {
        try {
            const userId = req.userId;
            const { page = 1, limit = 10, sortBy = 'publishYear', sortOrder = 'asc', title, publishYear } = req.query;
            const skip = (page - 1) * limit;

            const sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

            const filterCriteria = { userId };
            if (title) {
                filterCriteria.title = { $regex: new RegExp(title, 'i') };
            }
            if (publishYear) {
                filterCriteria.publishYear = parseInt(publishYear);
            }

            const movies = await Movie.find(filterCriteria)
                .skip(skip)
                .limit(parseInt(limit))
                .sort(sortOptions);

            const totalMovies = await Movie.countDocuments();

            return res.status(200).json({
                status: true,
                message: 'Movies retrieved successfully',
                data: { results: movies, totalCount: totalMovies },
            });
        } catch (error) {
            return res.status(500).json({ status: false, message: error.message || 'Something went Wrong', data: {} });
        }
    },

    createMovie: async (req, res) => {
        const userId = req.userId;
        const { title, posterUrl, publishYear } = req.body;

        try {
            const newMovie = await Movie.create({ title, posterUrl, publishYear, userId });
            await User.findByIdAndUpdate(userId, { $push: { movies: newMovie._id } }, { new: true })
            return res.status(201).json({ status: true, message: 'Movie created successfully', data: newMovie });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Error creating movie', data: {} });
        }
    },
    getMovieById: async (req, res) => {
        const { id } = req.query;
        const userId = req.userId;

        try {
            const movie = await Movie.findOne({ _id: id, userId });

            if (!movie) {
                return res.status(404).json({ status: false, message: 'Movie not found', data: {} });
            }

            return res.status(200).json({ status: true, message: 'Movie retrieved successfully', data: movie });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Error retrieving movie', data: {} });
        }
    },
    updateMovie: async (req, res) => {
        const { id } = req.query;
        const { title, posterUrl, publishYear } = req.body;
        const userId = req.userId;

        try {
            const updatedMovie = await Movie.findOneAndUpdate(
                { _id: id, userId },
                { title, posterUrl, publishYear },
                { new: true }
            );

            if (!updatedMovie) {
                return res.status(404).json({ status: false, message: 'Movie not found', data: {} });
            }

            return res.status(200).json({ status: true, message: 'Movie updated successfully', data: updatedMovie });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Error updating movie', data: {} });
        }
    },
    deleteMovie: async (req, res) => {
        const { id } = req.query;
        const userId = req.userId;

        try {
            const deletedMovie = await Movie.findOneAndDelete({ _id: id, userId });

            if (!deletedMovie) {
                return res.status(404).json({ status: false, message: 'Movie not found', data: {} });
            }

            return res.status(200).json({ status: true, message: 'Movie deleted successfully', data: deletedMovie });
        } catch (error) {
            return res.status(500).json({ status: false, message: 'Error deleting movie', data: {} });
        }
    },

}

module.exports = MovieController;

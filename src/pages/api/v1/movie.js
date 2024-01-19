import MovieController from "../../../../controllers/movies";
import authMiddleware from "../../../../middlewares/authMiddleware";

const handler = async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			const { id } = req.query;
			if (id) {
				return MovieController.getMovieById(req, res);
			}
			return MovieController.getAllMovies(req, res);

		case "POST":
			return MovieController.createMovie(req, res);

		case "PUT":
			return MovieController.updateMovie(req, res);

		case "DELETE":
			return MovieController.deleteMovie(req, res);

		default:
			return res.status(405).json({
				status: false,
				message: "Method Not Allowed",
				data: {},
			});
	}
};

export default authMiddleware(handler);

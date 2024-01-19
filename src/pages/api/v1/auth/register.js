import AuthController from "../../../../../controllers/auth";

const handler = async (req, res) => {
	const { method, path } = req;

	switch (method) {
		case "POST":
			return AuthController.register(req, res);

		default:
			return res.status(405).json({
				status: false,
				message: "Method Not Allowed",
				data: {},
			});
	}
};

export default handler;

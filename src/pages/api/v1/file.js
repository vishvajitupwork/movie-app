import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import multer from "multer";
import { Readable } from "stream";
import authMiddleware from "../../../../middlewares/authMiddleware";

const upload = multer({
	storage: multer.memoryStorage(),
});

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
};

const uploadFileHandler = async (req, res) => {
	try {
		if (req.method !== "POST") {
			return res.status(405).json({ error: "Method Not Allowed" });
		}

		const uploadMiddleware = upload.single("image");
		uploadMiddleware(req, res, async (err) => {
			if (err) {
				return res
					.status(500)
					.json({ error: `File upload failed: ${err.message}` });
			}

			if (!req.file) {
				return res.status(400).json({ error: "No file uploaded" });
			}

			const fileStream = Readable.from(req.file.buffer);

			const upload = new Upload({
				client: s3,
				params: {
					Bucket: process.env.S3_BUCKET_NAME,
					Key: `uploads/${Date.now()}-${req.file.originalname}`,
					Body: fileStream,
					ACL: "public-read",
				},
			});

			const result = await upload.done();

			const fileUrl = result.Location;
			const filePath = result.Key;

			return res.status(200).json({
				status: true,
				message: "File uploaded successfully",
				data: { fileUrl, filePath },
			});
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: false,
			message: error.message || "Something went wrong",
			data: {},
		});
	}
};

export default authMiddleware(uploadFileHandler);

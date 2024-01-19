import withDbConnect from "../../../../utils/withDbConnect";

const handler = async (req, res) => {
  const testData = { message: "This is a test API route!" };

  res.status(200).json(testData);
};

export default withDbConnect(handler);

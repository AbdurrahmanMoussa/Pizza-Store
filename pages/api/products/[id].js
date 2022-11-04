import dbConnect from "../../../lib/mongoDB";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const {
    method,
    cookies,
    query: { id },
  } = req;

  const token = cookies.token;

  await dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json({ message: "Not authorized" });
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json({ message: "Not authorized" });
    }
    try {
      await Product.findByIdAndDelete(id);
      return res.status(201).json("The product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

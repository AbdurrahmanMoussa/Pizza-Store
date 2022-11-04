import cookie from "cookie";

const handler = (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Set cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.TOKEN, {
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
          httpOnly: process.env.NODE_ENV !== "development" ? true : false,
          secure: process.env.NODE_ENV !== "development",
        })
      );

      res.status(200).json({ message: "Success", status: 200 });
    } else {
      res.status(401).json({ message: "Invalid credentials", status: 401 });
    }
  }
};
export default handler;

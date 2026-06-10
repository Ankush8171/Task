import jwt from "jsonwebtoken"


const userMiddleware = (req, res, next) => {
  try {

    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.id;

    next();

  } catch (error) {

    console.log(error.message);

    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export default userMiddleware;
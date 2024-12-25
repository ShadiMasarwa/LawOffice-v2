const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the access token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded; // Attach decoded token info to `req`
    return next();
  } catch (err) {
    // Handle token expiration
    if (err.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token missing" });
      }

      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        // Generate a new access token
        const newAccessToken = jwt.sign(
          { userId: decodedRefresh.userId },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        req.user = decodedRefresh; // Attach decoded refresh token info to `req`
        return next();
      } catch (refreshError) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }
    }

    return res.status(403).json({ message: "Invalid access token" });
  }
};

module.exports = authMiddleware;

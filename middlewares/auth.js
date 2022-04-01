/**
 * Checks if user is authenticated or not.
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

async function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.json({
      success: false,
      error: "User unauthenticated.",
    });
  }
}

async function authenticatedDoctor(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "doctor") {
    next();
  } else {
    return res.json({
      success: false,
      error: "User unauthenticated.",
    });
  }
}

export { authenticated, authenticatedDoctor };

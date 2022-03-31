/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getUser(req, res) {
  console.log(req.user);
  if (req.isAuthenticated()) {
    res.json({ success: true, message: req.user });
  } else {
    res.json({
      success: false,
      error: "You are not authenticated. Please sign in.",
    });
  }
}

export { getUser };

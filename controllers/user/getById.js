import User from "../../models/user.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */

async function getUser(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.json({
        success: false,
        error: "User not found.",
      });
    }

    return res.json({
      success: true,
      message: user,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { getUser };

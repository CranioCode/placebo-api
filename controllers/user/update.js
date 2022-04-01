import User from "../../models/user.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateUser(req, res) {
  try {
    const { phoneNumber, address } = req.body;

    const user = await User.findById(req.user._id);

    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.address = address || user.address;

    await user.save();

    res.json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error.",
    });
  }
}

export { updateUser };

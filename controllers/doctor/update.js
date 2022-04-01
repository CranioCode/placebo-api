import Doctor from "../../models/doctor.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function updateDoctor(req, res) {
  try {
    const {
      charge,
      specializations,
      qualifications,
      highlights,
      description,
      address,
      phoneNumber,
      profilePic,
    } = req.body;

    const doctor = await Doctor.findById(req.user._id);

    if (!doctor) {
      return res.json({
        success: false,
        error: "Doctor not found",
      });
    }

    doctor.charge = charge || doctor.charge;
    doctor.specializations = specializations || doctor.specializations;
    doctor.qualifications = qualifications || doctor.qualifications;
    doctor.highlights = highlights || doctor.highlights;
    doctor.description = description || doctor.description;
    doctor.address = address || doctor.address;
    doctor.phoneNumber = phoneNumber || doctor.phoneNumber;
    doctor.profilePic = profilePic || doctor.profilePic;

    await doctor.save();

    res.json({
      success: true,
      message: "Doctor details updated successfully.",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: true,
      error: "Internal Server Error",
    });
  }
}

export { updateDoctor };

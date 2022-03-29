async function login(_, res) {
  try {
    return res.json({
      success: true,
      message: "Log In Successful",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      error: "Internal Server Error",
    });
  }
}

export { login };

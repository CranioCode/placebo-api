async function logout(req, res) {
  if (req.isAuthenticated()) {
    req.logout();
    res.json({
      success: true,
      message: "LOGGED YOU OUT",
    });
  } else {
    res.json({
      success: true,
      message: "ALREADY LOGGED OUT",
    });
  }
}

export { logout };

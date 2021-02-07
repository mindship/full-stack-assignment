const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      password:user.password,
    },
    process.env.JWT_SCRET ||"somethingusefull",
    {
      expiresIn: "30d",
    }
  );
};
module.exports = generateToken;

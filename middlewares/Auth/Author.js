const Authorize = (arrAuthor) => async (req, res, next) => {
  const user = req.user;
  //   const hhh = arrAuthor.findIndex((ele) => ele == user.author);
  //   console.log(hhh);
  try {
    if (arrAuthor.includes(user.author)) {
      next();
    } else {
      res.status(403).send({ message: "You are Logged but not authorize" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = Authorize;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  
  exports.getUserPhone = async (req, res) => {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).send({ message: "User Not Found" });
      }
      res.status(200).send({ phone: user.phone });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
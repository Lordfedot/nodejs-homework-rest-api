const { changeAvatar } = require("../models/filesServices");
const uploadCtrl = async (req, res) => {
  const { file, user } = req;
  const result = await changeAvatar(file, user);
  return res.json({avatarURL: result.avatarURL});
};

module.exports = { uploadCtrl };

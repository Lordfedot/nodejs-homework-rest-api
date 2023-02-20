const fs = require("fs/promises");
const { User } = require("../db/userModel");
const { avatarProcessing } = require("../helpers/avatarProcessing");

const PORT = process.env.Port;

const changeAvatar = async (file, user) => {
  const { originalname, path } = file;
  const owner = user[0].owner;
  const newAvatarName = avatarProcessing(originalname);

  const avatarURL = `http://localhost:${PORT}/avatars/${newAvatarName}.jpg`;

  await fs.unlink(path);
  const result = await User.findOneAndUpdate(
    { _id: owner },
    { $set: { avatarURL } }
  );
  return result;
};

module.exports = {
  changeAvatar,
};

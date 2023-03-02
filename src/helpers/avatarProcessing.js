const Jimp = require("jimp");
const { uuid } = require("uuidv4");

const avatarProcessing = (name) => {
  const newAvatarName = uuid();
  Jimp.read(`tmp/${name}`, (err, avatar) => {
    if (err) {
      throw err;
    }
    avatar
      .resize(250, 250)
      .quality(60)
      .greyscale()
      .write(`src/public/avatars/${newAvatarName}.jpg`);
  });
  return newAvatarName;
};

module.exports = { avatarProcessing };

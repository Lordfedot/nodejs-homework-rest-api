

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHadler = (err, req, res, next) => {
  return res.status(500).json({ message: err.message });
};

module.exports = {
  asyncWrapper,
  errorHadler,
};

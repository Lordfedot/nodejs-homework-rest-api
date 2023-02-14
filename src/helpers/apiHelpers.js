const mongoose = require("mongoose");
const { WrongParametersError, ValidationError } = require("../helpers/errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHadler = (err, req, res, next) => {
  if (err instanceof WrongParametersError || err instanceof ValidationError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
};

const getIdValidation = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new WrongParametersError("Invalid ID");
  }
};

module.exports = {
  asyncWrapper,
  errorHadler,
  getIdValidation,
};

class MyCustomError extends Error{
  constructor(message){
    super(message)
    this.status = 400
  }
  
}
class ValidationError extends MyCustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ConflictError extends MyCustomError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class WrongParametersError extends MyCustomError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class NotAuthorizedError extends MyCustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  MyCustomError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ConflictError
};

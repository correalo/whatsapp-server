export class ValidatorError extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ValidatorError.prototype);
  }
}

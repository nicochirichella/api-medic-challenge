export class UserNotFoundException extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UserNotFoundException.prototype);
  }
}

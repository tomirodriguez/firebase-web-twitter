type CustomErrorType = {
  message: string;
  code: string;
};

export class CustomError extends Error {
  code: string;

  constructor({ message, code }: CustomErrorType) {
    super(message);
    this.code = code;
  }
}

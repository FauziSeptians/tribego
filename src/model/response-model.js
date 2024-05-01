export class ResponseModel {
  constructor(data = {}, message = "") {
    this.data = data;
    this.message = message;
  }

  toJSON() {
    return {
      statusCode: 200,
      message: this.message,
      additionalData: this.data,
    };
  }
}

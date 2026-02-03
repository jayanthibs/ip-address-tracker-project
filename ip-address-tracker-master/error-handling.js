//creating custom class for NetworkError
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}
//creating custom class for DataError
export class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataError";
  }
}
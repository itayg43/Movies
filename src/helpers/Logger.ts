export class Logger {
  private static isInDevelopment = process.env.NODE_ENV === 'development';

  static log(log: any) {
    if (this.isInDevelopment) {
      console.log(log);
    }
  }

  static error(error: any) {
    if (this.isInDevelopment) {
      console.error(error);
    }
  }
}

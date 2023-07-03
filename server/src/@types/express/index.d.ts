declare namespace Express {
  export interface Request {
    userId: string;
    file?: Express.MulterS3.File;
  }
}

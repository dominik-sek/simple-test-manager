declare namespace Express{
  export interface Request {
    user: {
      sub: number;
      username: string,
      role: string,
      full_name: string,
      iat: number,
      exp: number

    }
  }
}